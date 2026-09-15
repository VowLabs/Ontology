// Classifications stay local to each deployable package; the ontology owns the map.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const manifest = JSON.parse(readFileSync(resolve(root, 'VowLabs/Ontology/_support/storage/index.json')));
const catalogue = createRequire(resolve(root, 'NokNok/package.json'))('./shared/ontology-catalogue.js');
for (const [project, store] of Object.entries(manifest.Stores)) {
  for (const code of Object.values(store.Tables || store.Files)) {
    if (!catalogue.nodes[code]) throw Error(`Unknown classification ${project}: ${code}`);
  }
  if (!store.Tables) {
    const local = JSON.parse(readFileSync(resolve(root, project, 'ontology-storage.json')));
    if (JSON.stringify(local.files) !== JSON.stringify(store.Files) || local.ontologyVersion !== manifest.Version) throw Error('NokNok WWW storage manifest is out of date.');
    for (const [file, code] of Object.entries(store.Files)) if (local.public[file] !== manifest.PublicCodes.includes(code)) throw Error(`Incorrect visibility for ${file}`);
    continue;
  }
  const schemaFile = project === 'VowCorp' ? 'migrations/001_agentic_commerce.sql' : project === 'PriceEdge' ? 'lib/state-store.mjs' : 'lib/product-store.mjs';
  const schema = readFileSync(resolve(root, project, schemaFile), 'utf8');
  for (const [, table] of schema.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)/g)) {
    if (!store.Tables[table]) throw Error(`Unclassified table ${project}.${table}`);
  }
  let expected = '-- Generated from NokNok/Ontology/_support/storage/index.json.\n';
  for (const [table, code] of Object.entries(store.Tables)) {
    if (!/^[a-z_]+$/.test(table)) throw Error('Invalid table name');
    expected += `ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS ontology_code TEXT NOT NULL DEFAULT '${code}';\nALTER TABLE ${table} ADD COLUMN IF NOT EXISTS ontology_version TEXT NOT NULL DEFAULT '${manifest.Version}';\n`;
  }
  for (const [table, code] of Object.entries(store.Tables)) expected += `ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS ontology_public BOOLEAN NOT NULL DEFAULT ${manifest.PublicCodes.includes(code) ? 'TRUE' : 'FALSE'};\n`;
  const file = project === 'VowCorp' ? 'migrations/002_ontology_classification.sql' : 'lib/ontology-classification.sql';
  if (readFileSync(resolve(root, project, file), 'utf8') !== expected) throw Error(`Classification SQL is out of date: ${project}/${file}`);
}
console.log('Storage codes, SQL migrations and table coverage verified.');
