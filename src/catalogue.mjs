import { readFileSync, realpathSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { delegationFor } from './delegation.mjs';
import { resolveChoices } from './choices.mjs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ontologyRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Pure loader: validates canonical source without reading or writing client data.
export function loadCatalogue(directory = ontologyRoot) {
  const root = realpathSync(directory);
  const sourcesPath = resolve(root, 'data/provenance/index.json');
  const sources = existsSync(sourcesPath) ? JSON.parse(readFileSync(sourcesPath, 'utf8')) : {};
  const sourceCache = new Map();
  function validateSource(node) {
    if (!node.Source) return;
    const source = node.Source, provider = sources[source.Provider];
    if (!provider || !/^[a-f0-9]{40}$/.test(provider.Revision) || !/^https:\/\//.test(provider.Repository)
      || typeof source.Path !== 'string' || !provider.Files?.[source.Path] || !source.Fields)
      throw Error('Invalid definition source');
    const folder = realpathSync(resolve(root, 'data/provenance', provider.Snapshot));
    const file = realpathSync(resolve(folder, source.Path));
    if (!folder.startsWith(root + '/data/provenance/') || !file.startsWith(folder + '/')) throw Error('Escaping definition source');
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
  const delegations = {};
  const assigned = code => delegationFor({delegations}, code);
  const datasets = {};
  for (const id of ['services', 'professions']) {
    const data = JSON.parse(readFileSync(resolve(root, 'data', id, 'index.json'), 'utf8'));
    if (data.id !== id || !Number.isInteger(data.version) || data.version < 1 || !Array.isArray(data.records)) throw Error(`Invalid dataset: ${id}`);
    const ids = new Set();
    for (const record of data.records) {
      if (typeof record.id !== 'string' || !record.id || ids.has(record.id) || typeof record.name !== 'string' || !record.name) throw Error(`Invalid dataset record: ${id}`);
      ids.add(record.id);
      validateSource(record);
      if (record.Name !== undefined && record.Name !== record.name) throw Error(`Inconsistent dataset name: ${id}`);
    }
    datasets[id] = data;
  }
  const nodes = {},
    visited = new Set();
  function visit(file, code = '') {
    file = realpathSync(file);
    if (!file.startsWith(root + '/') || visited.has(file))
      throw Error(`Repeated or escaping reference: ${file}`);
    visited.add(file);
    const node = JSON.parse(readFileSync(file, 'utf8'));
    for (const key of ['Records', 'ManagedBy', 'InstanceKey', 'Preference', 'RegistryVersion', 'Storage', 'Application', 'SourceKey'])
      if (key in node) throw Error(`Data or application state in ontology definition: ${file} (${key})`);
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
  for (const [prefix,node] of Object.entries(nodes)) {
    if (node.Delegation === undefined) continue;
    const grant=node.Delegation;
    if (!grant || typeof grant !== 'object' || Array.isArray(grant)
      || !/^[a-z][a-z0-9-]*$/.test(grant.id) || Object.hasOwn(delegations,grant.id)
      || typeof grant.name !== 'string' || !grant.name || typeof grant.url !== 'string'
      || Object.keys(grant).some(key=>!['id','name','url','repository'].includes(key))) throw Error('Invalid boundary delegation');
    const url=new URL(grant.url);
    if (url.protocol!=='https:' || url.username || url.password || url.search || url.hash || !url.pathname.endsWith('/')) throw Error('Invalid delegation URL');
    delegations[grant.id]={...grant,prefix,ontologyVersion:nodes[''].Version};
  }
  for (const [id, delegation] of Object.entries(delegations)) {
    if (delegation.id !== id || !/^[A-Z][A-Z0-9]*(?::[A-Z][A-Z0-9]*)*$/.test(delegation.prefix) || !nodes[delegation.prefix] || delegation.ontologyVersion !== nodes[''].Version) throw Error('Invalid delegation assignment');
    if (Object.keys(nodes).some(code => code.startsWith(delegation.prefix + ':')) || nodes[delegation.prefix].Children) throw Error('Delegated definitions must not be stored locally');
    nodes[delegation.prefix].delegation = id;
    nodes[delegation.prefix].authoritativeUrl = delegation.url;
  }
  for (const node of Object.values(nodes)) {
    if (!(node.Type && assigned(node.Type)) && (typeof node.Collection !== 'boolean' || typeof node.Composite !== 'boolean' || (typeof node.Scalar === 'boolean' && node.Collection === node.Scalar) || (node.Type && node.Composite)))
      throw Error(`Invalid Collection flag: ${node.Code}`);
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
        Object.values(node.Children || {}).some((code) => !nodes[code]?.Type && typeof nodes[code]?.Scalar !== 'boolean' && !nodes[code]?.Children))
    )
      throw Error(`Invalid answer object: ${node.Code}`);
    if (node.Type && !nodes[node.Type]?.ValueType && !assigned(node.Type))
      throw Error(`Unknown value type: ${node.Code}`);
    if (node.Type && !assigned(node.Type) && !node.Question)
      throw Error(`Missing question: ${node.Code}`);
    if (
      node.Type &&
      !('Scalar' in nodes[node.Code.split(':').slice(0, -1).join(':')])
    )
      throw Error(`Answer outside object: ${node.Code}`);
    if (node.RequiredFields !== undefined && (typeof node.Scalar !== 'boolean' || !Array.isArray(node.RequiredFields) || !node.RequiredFields.length || new Set(node.RequiredFields).size !== node.RequiredFields.length || node.RequiredFields.some(key => !node.Children?.[key] || !nodes[node.Children[key]]?.Type))) throw Error(`Invalid required fields: ${node.Code}`);
    if (node.RecordReference && (nodes[node.Type]?.ValueType !== 'string' || (!nodes[node.RecordReference] && !assigned(node.RecordReference)))) throw Error(`Invalid record reference: ${node.Code}`);
    if (node.LabelField !== undefined && (typeof node.LabelField !== 'string' || !node.Children?.[node.LabelField])) throw Error(`Invalid LabelField: ${node.Code}`);
    if (node.DisplayFormat !== undefined) {
      if (typeof node.DisplayFormat !== 'string' || typeof node.Scalar !== 'boolean') throw Error(`Invalid DisplayFormat: ${node.Code}`);
      for (const match of node.DisplayFormat.matchAll(/\{([^}]+)\}/g)) if (!node.Children?.[match[1]]) throw Error(`Unknown DisplayFormat field: ${node.Code}:${match[1]}`);
      if (node.DisplayOmitValues && Object.entries(node.DisplayOmitValues).some(([key, values]) => !node.Children?.[key] || !Array.isArray(values) || values.some(value => typeof value !== 'string'))) throw Error(`Invalid DisplayOmitValues: ${node.Code}`);
    }
    const choices = resolveChoices(nodes, node.Code, datasets);
    if (node.Dataset && (!Object.hasOwn(datasets, node.Dataset) || datasets[node.Dataset].definitionCode !== node.Reference)) throw Error(`Invalid dataset reference: ${node.Code}`);
    if (node.Choices && !Array.isArray(node.Choices) && typeof node.Choices === 'object' && (nodes[node.Type]?.ValueType !== 'string' || node.AllowCustom || node.ChoiceAliases)) throw Error(`Invalid dataset choices: ${node.Code}`);
    if (typeof node.Choices === 'string' && (nodes[node.Type]?.ValueType !== 'string' || node.AllowCustom || node.ChoiceAliases)) throw Error(`Invalid branch-backed choices: ${node.Code}`);
    if (node.AllowCustom !== undefined && (node.AllowCustom !== true || nodes[node.Type]?.ValueType !== 'string' || !choices?.includes(node.CustomChoice))) throw Error(`Invalid custom choice: ${node.Code}`);
    if (node.ChoiceAliases && Object.values(node.ChoiceAliases).some(value => !choices?.includes(value))) throw Error(`Invalid choice alias: ${node.Code}`);
    if (node.Pattern) new RegExp(node.Pattern);
  }
  // Request presets belong to consuming applications. Preserve the empty API field.
  const collections = {};
  function checkOrphans(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        if (!['data', 'docs', 'src', 'test', 'versions'].some(name => p === resolve(root, name)) && entry.name !== 'node_modules' && !entry.name.startsWith('.'))
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
  const migrations = Object.fromEntries(readdirSync(resolve(root, 'versions/migrations')).filter(f => f.endsWith('.json')).map(f => [f.slice(0, -5), JSON.parse(readFileSync(resolve(root, 'versions/migrations', f), 'utf8'))]));
  const legacyPath = resolve(root, 'versions/legacy.json');
  const legacy = existsSync(legacyPath) ? JSON.parse(readFileSync(legacyPath, 'utf8')) : {};
  for (const dataset of Object.values(datasets)) if (!nodes[dataset.definitionCode] && !assigned(dataset.definitionCode)) throw Error(`Unknown dataset definition: ${dataset.id}`);
  return { version: nodes[''].Version, nodes, datasets, collections, migrations, legacy, sources, delegations };
}
