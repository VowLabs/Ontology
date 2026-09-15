import { readFileSync, realpathSync, readdirSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ontologyRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Pure loader: validates canonical source without reading or writing client data.
export function loadCatalogue(directory = ontologyRoot) {
  const root = realpathSync(directory);
  const nodes = {},
    visited = new Set();
  function visit(file, code = '') {
    file = realpathSync(file);
    if (!file.startsWith(root + '/') || visited.has(file))
      throw Error(`Repeated or escaping reference: ${file}`);
    visited.add(file);
    const node = JSON.parse(readFileSync(file, 'utf8'));
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
    if (node.DisplayFormat !== undefined) {
      if (typeof node.DisplayFormat !== 'string' || typeof node.Scalar !== 'boolean') throw Error(`Invalid DisplayFormat: ${node.Code}`);
      for (const match of node.DisplayFormat.matchAll(/\{([^}]+)\}/g)) if (!node.Children?.[match[1]]) throw Error(`Unknown DisplayFormat field: ${node.Code}:${match[1]}`);
      if (node.DisplayOmitValues && Object.entries(node.DisplayOmitValues).some(([key, values]) => !node.Children?.[key] || !Array.isArray(values) || values.some(value => typeof value !== 'string'))) throw Error(`Invalid DisplayOmitValues: ${node.Code}`);
    }
    if (node.AllowCustom !== undefined && (node.AllowCustom !== true || nodes[node.Type]?.ValueType !== 'string' || !node.Choices?.includes(node.CustomChoice))) throw Error(`Invalid custom choice: ${node.Code}`);
    if (node.ChoiceAliases && Object.values(node.ChoiceAliases).some(value => !node.Choices?.includes(value))) throw Error(`Invalid choice alias: ${node.Code}`);
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
  return { version: nodes[''].Version, nodes, collections, migrations };
}
