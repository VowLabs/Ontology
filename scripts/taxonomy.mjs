import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { loadCatalogue, ontologyRoot } from '../src/catalogue.mjs';

// Validate the catalogue before deriving documentation from its source references.
const catalogue = loadCatalogue();
const nodes = [];
function visit(file, code = '') {
  const node = JSON.parse(readFileSync(file, 'utf8'));
  nodes.push({ code, file, node });
  for (const [key, ref] of Object.entries(node.Children ?? {})) {
    visit(resolve(dirname(file), ref.$ref), code ? `${code}:${key}` : key);
  }
}
visit(resolve(ontologyRoot, 'index.json'));
const id = code => code ? `n_${code.replaceAll(':', '_')}` : 'root';
const label = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function graph(entries) {
  const codes = new Set(entries.map(entry => entry.code));
  const lines = ['```mermaid', 'flowchart LR'];
  for (const { code, node } of entries) lines.push(`    ${id(code)}["${label(code ? `${code} · ${node.Name}` : node.Name)}"]`);
  for (const { code, node } of entries) {
    for (const key of Object.keys(node.Children ?? {})) {
      const child = code ? `${code}:${key}` : key;
      if (codes.has(child)) lines.push(`    ${id(code)} --> ${id(child)}`);
    }
  }
  return [...lines, '```'].join('\n');
}
const overview = graph(nodes.filter(({ code }) => !code.includes(':')));
let taxonomy = `# Datapoint taxonomy

[Back to the ontology README](../README.md#datapoint-taxonomy-graph)

This graph documents the ${nodes.length} local definitions (including the root) in
ontology \`${catalogue.version}\`, following \`Children\` references from [index.json](../index.json).
Each domain graph includes every local descendant, with its canonical code.

Arrows mean parent–child containment. Organizing branches, classification
concepts, records, and answer fields all appear in the tree; fields are not
subtypes of their containing record. \`Type\`, \`Choices\`, and record references
are separate relationships and are not drawn here. Reference-data entries
(such as named professions and services) and application records are not
ontology nodes.

\`S:G\` stops at the delegated Geography boundary. Its descendants and datasets
are owned by Geo and are not part of this local snapshot. See the
[delegation guide](../Science/Geography/README.md).

Regenerate these graphs and the README overview from the canonical definitions
with \`npm --prefix VowLabs/Ontology run docs:taxonomy\` from the Vow workspace.

## Domains

${overview}
`;
for (const domain of nodes.filter(({ code }) => code && !code.includes(':'))) {
  const entries = nodes.filter(({ code }) => code === domain.code || code.startsWith(`${domain.code}:`));
  const guide = relative(ontologyRoot, resolve(dirname(domain.file), 'README.md'));
  taxonomy += `\n## ${domain.node.Name} (\`${domain.code}\`)\n\n[Domain guide](../${guide}) · ${entries.length} local definitions.\n\n${graph(entries)}\n\n### Source definitions\n\n`;
  taxonomy += entries.map(({ code, file, node }) => `- [\`${code}\` — ${node.Name}](../${relative(ontologyRoot, file)})`).join('\n') + '\n';
}
const readmePath = resolve(ontologyRoot, 'README.md');
const readme = readFileSync(readmePath, 'utf8').replace(/```mermaid\n[\s\S]*?```/, overview);
for (const [file, content] of [[readmePath, readme], [resolve(ontologyRoot, 'docs/taxonomy.md'), taxonomy]]) {
  if (process.argv.includes('--check')) {
    if (readFileSync(file, 'utf8') !== content) throw Error(`Stale taxonomy documentation: ${relative(ontologyRoot, file)}`);
  } else writeFileSync(file, content);
}
console.log(`Taxonomy documentation ${process.argv.includes('--check') ? 'verified' : 'updated'}: ${nodes.length} definitions.`);
