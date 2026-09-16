import { readFileSync, realpathSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolveChoices } from './choices.mjs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ontologyRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Pure loader: validates canonical source without reading or writing client data.
export function loadCatalogue(directory = ontologyRoot) {
  const root = realpathSync(directory);
  const sourcesPath = resolve(root, '_support/sources/index.json');
  const sources = existsSync(sourcesPath) ? JSON.parse(readFileSync(sourcesPath, 'utf8')) : {};
  const sourceCache = new Map();
  function validateSource(node) {
    if (!node.Source) return;
    const source = node.Source, provider = sources[source.Provider];
    if (!provider || !/^[a-f0-9]{40}$/.test(provider.Revision) || !/^https:\/\//.test(provider.Repository)
      || typeof source.Path !== 'string' || !provider.Files?.[source.Path] || !source.Fields)
      throw Error('Invalid definition source');
    const folder = realpathSync(resolve(root, '_support/sources', provider.Snapshot));
    const file = realpathSync(resolve(folder, source.Path));
    if (!folder.startsWith(root + '/_support/sources/') || !file.startsWith(folder + '/')) throw Error('Escaping definition source');
    if (!sourceCache.has(file)) {
      const bytes = readFileSync(file);
      if (createHash('sha256').update(bytes).digest('hex') !== provider.Files[source.Path]) throw Error(`Source checksum mismatch: ${source.Path}`);
      sourceCache.set(file, JSON.parse(bytes));
    }
    for (const [field, pointer] of Object.entries(source.Fields)) {
      if (typeof pointer !== 'string' || !pointer.startsWith('/')) throw Error('Invalid source pointer');
      let value = sourceCache.get(file);
      for (const part of pointer.slice(1).split('/').map(p => p.replace(/~1/g, '/').replace(/~0/g, '~'))) {
        if (!value || !Object.hasOwn(value, part)) throw Error(`Missing source value: ${pointer}`);
        value = value[part];
      }
      if (JSON.stringify(node[field]) !== JSON.stringify(value)) throw Error(`Definition differs from source: ${source.Path} ${field}`);
    }
  }
  const nodes = {},
    visited = new Set();
  function visit(file, code = '') {
    file = realpathSync(file);
    if (!file.startsWith(root + '/') || visited.has(file))
      throw Error(`Repeated or escaping reference: ${file}`);
    visited.add(file);
    const node = JSON.parse(readFileSync(file, 'utf8'));
    validateSource(node);
    if (!node.Name || typeof node.Name !== 'string')
      throw Error(`Missing Name: ${file}`);
    if ('Kind' in node || 'Code' in node)
      throw Error(`Codes come from paths, not ${file}`);
    for (const key of ['Public', 'PublicRequired', 'PrivateRequired', 'SubjectType'])
      if (key in node && typeof node[key] !== 'boolean') throw Error(`Invalid ${key}: ${file}`);
    if ('Scalar' in node && typeof node.Scalar !== 'boolean')
      throw Error(`Scalar must be boolean: ${file}`);
    nodes[code] = { ...node, Code: code };
    if (node.Children) {
      nodes[code].Children = {};
      for (const [key, ref] of Object.entries(node.Children)) {
        if (
          !/^[A-Z][A-Z0-9]*$/.test(key) ||
          Object.keys(ref).join() !== '$ref' ||
          !ref.$ref.startsWith('./')
        )
          throw Error(`Invalid child in ${file}`);
        const child = code ? `${code}:${key}` : key;
        nodes[code].Children[key] = child;
        visit(resolve(dirname(file), ref.$ref), child);
      }
    }
  }
  visit(resolve(root, 'index.json'));
  for (const node of Object.values(nodes)) {
    if (
      node.ValueType &&
      !['string', 'integer', 'number', 'boolean'].includes(node.ValueType)
    )
      throw Error(`Invalid primitive: ${node.Code}`);
    if (
      typeof node.Scalar === 'boolean' &&
      (!Array.isArray(node.Subjects) ||
        !node.Subjects.length ||
        node.Subjects.some((s) => !nodes[s]?.SubjectType) ||
        Object.values(node.Children || {}).some((code) => !nodes[code]?.Type))
    )
      throw Error(`Invalid answer object: ${node.Code}`);
    if (node.Type && !nodes[node.Type]?.ValueType)
      throw Error(`Unknown value type: ${node.Code}`);
    if (node.Type && !node.Question)
      throw Error(`Missing question: ${node.Code}`);
    if (
      node.Type &&
      !('Scalar' in nodes[node.Code.split(':').slice(0, -1).join(':')])
    )
      throw Error(`Answer outside object: ${node.Code}`);
    if (node.LabelField !== undefined && (typeof node.LabelField !== 'string' || !node.Children?.[node.LabelField])) throw Error(`Invalid LabelField: ${node.Code}`);
    if (node.DisplayFormat !== undefined) {
      if (typeof node.DisplayFormat !== 'string' || typeof node.Scalar !== 'boolean') throw Error(`Invalid DisplayFormat: ${node.Code}`);
      for (const match of node.DisplayFormat.matchAll(/\{([^}]+)\}/g)) if (!node.Children?.[match[1]]) throw Error(`Unknown DisplayFormat field: ${node.Code}:${match[1]}`);
      if (node.DisplayOmitValues && Object.entries(node.DisplayOmitValues).some(([key, values]) => !node.Children?.[key] || !Array.isArray(values) || values.some(value => typeof value !== 'string'))) throw Error(`Invalid DisplayOmitValues: ${node.Code}`);
    }
    const choices = resolveChoices(nodes, node.Code);
    if (typeof node.Choices === 'string' && (nodes[node.Type]?.ValueType !== 'string' || node.AllowCustom || node.ChoiceAliases)) throw Error(`Invalid branch-backed choices: ${node.Code}`);
    if (node.AllowCustom !== undefined && (node.AllowCustom !== true || nodes[node.Type]?.ValueType !== 'string' || !choices?.includes(node.CustomChoice))) throw Error(`Invalid custom choice: ${node.Code}`);
    if (node.ChoiceAliases && Object.values(node.ChoiceAliases).some(value => !choices?.includes(value))) throw Error(`Invalid choice alias: ${node.Code}`);
    if (node.Pattern) new RegExp(node.Pattern);
  }
  const collections = JSON.parse(
    readFileSync(resolve(root, '_support/collections/index.json')),
  );
  for (const collection of Object.values(collections))
    for (const code of collection.Fields)
      if (!nodes[code]?.Type) throw Error(`Unknown collection field: ${code}`);
  function checkOrphans(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        if (p !== resolve(root, '_support') && entry.name !== 'node_modules' && !entry.name.startsWith('.'))
          checkOrphans(p);
      } else if (
        entry.name.endsWith('.json') &&
        !(dir === root && ['package.json', 'package-lock.json'].includes(entry.name)) &&
        !visited.has(realpathSync(p))
      )
        throw Error(`Unreachable definition: ${relative(root, p)}`);
    }
  }
  checkOrphans(root);
  const migrations = Object.fromEntries(readdirSync(resolve(root, '_support/migrations')).filter(f => f.endsWith('.json')).map(f => [f.slice(0, -5), JSON.parse(readFileSync(resolve(root, '_support/migrations', f), 'utf8'))]));
  const legacyPath = resolve(root, '_support/legacy.json');
  const legacy = existsSync(legacyPath) ? JSON.parse(readFileSync(legacyPath, 'utf8')) : {};
  return { version: nodes[''].Version, nodes, collections, migrations, legacy, sources };
}
