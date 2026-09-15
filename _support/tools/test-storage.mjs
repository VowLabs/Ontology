// Uses disposable databases only. Does not open any application database.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
const require = createRequire(resolve(root, 'PriceEdge/package.json'));
const postgres = require('postgres');
const adminUrl = process.env.ONTOLOGY_TEST_POSTGRES_URL || 'postgresql://localhost/postgres';
const admin = postgres(adminUrl, {max:1,onnotice:()=>{}});
const manifest = JSON.parse(readFileSync(resolve(root,'VowLabs/Ontology/_support/storage/index.json')));
try {
  for (const [project,store] of Object.entries(manifest.Stores)) {
    if (!store.Tables) continue;
    const name = `ontology_test_${process.pid}_${project.toLowerCase()}`;
    await admin.unsafe(`CREATE DATABASE "${name}"`);
    const url = new URL(adminUrl);url.pathname = '/'+name;
    const sql = postgres(url.toString(), {max:1,onnotice:()=>{}});
    try {
      // Each legacy table has an existing record. The additive migration must
      // preserve it, classify it, and classify future writes with defaults.
      for (const table of Object.keys(store.Tables)) {
        await sql.unsafe(`CREATE TABLE ${table} (id TEXT PRIMARY KEY, payload TEXT NOT NULL)`);
        await sql.unsafe(`INSERT INTO ${table} (id,payload) VALUES ('legacy','unchanged')`);
      }
      const path = project === 'VowCorp' ? 'migrations/002_ontology_classification.sql' : 'lib/ontology-classification.sql';
      const migration = readFileSync(resolve(root,project,path),'utf8');
      await sql.begin(tx=>tx.unsafe(migration));
      await sql.begin(tx=>tx.unsafe(migration));
      for (const [table,code] of Object.entries(store.Tables)) {
        await sql.unsafe(`INSERT INTO ${table} (id,payload) VALUES ('new','new value')`);
        const rows = await sql.unsafe(`SELECT * FROM ${table} ORDER BY id`);
        assert.equal(rows[0].payload,'unchanged');assert.equal(rows.length,2);
        for (const row of rows) {assert.equal(row.ontology_code,code);assert.equal(row.ontology_version,manifest.Version);assert.equal(row.ontology_public,manifest.PublicCodes.includes(code));}
      }
      console.log(`${project}: legacy backfill, future defaults and repeat migration passed.`);
    } finally {await sql.end();await admin.unsafe(`DROP DATABASE "${name}"`);}
  }
} finally {await admin.end();}
