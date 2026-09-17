import { readFileSync, writeFileSync, readdirSync, realpathSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2), options = {};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') options.check = true;
  else if (['--checkout', '--revision'].includes(args[i]) && args[i+1]) options[args[i].slice(2)] = args[++i];
  else throw Error('Usage: node _support/tools/import-geo.mjs --checkout PATH [--revision COMMIT] [--check]');
}
if (!options.checkout) throw Error('--checkout is required; the importer never runs upstream JavaScript.');
const checkout = realpathSync(options.checkout);
const locks = JSON.parse(readFileSync(resolve(root, '_support/sources/index.json')));
const revision = options.revision || locks.geo.Revision;
if (!/^[a-f0-9]{40}$/.test(revision)) throw Error('Use a full pinned commit SHA.');
const git = (...args) => execFileSync('git', ['-C', checkout, ...args], {encoding:'utf8'}).trim();
if (git('rev-parse', 'HEAD') !== revision) throw Error('Checkout HEAD does not match the requested revision.');
if (git('status', '--porcelain', '--', 'data/country', 'LICENSE')) throw Error('Source country files or license have local changes.');
const outputs = new Map(), files = {}, records = [];
const json = value => JSON.stringify(value, null, 2) + '\n';
const put = (path, value) => outputs.set(path, typeof value === 'string' || Buffer.isBuffer(value) ? value : json(value));
function sourceBytes(path) {
  const file = realpathSync(resolve(checkout, path));
  if (!file.startsWith(checkout + '/')) throw Error('Source path escapes checkout.');
  return readFileSync(file);
}
for (const filename of readdirSync(resolve(checkout, 'data/country')).filter(name => /^[A-Z]{2}\.json$/.test(name)).sort()) {
  const iso2 = filename.slice(0,2), path = 'data/country/' + filename, bytes = sourceBytes(path);
  const data = JSON.parse(bytes).data, name = data?.name?.common, official = data?.name?.official, iso3 = data?.iso3;
  if (![name, official].every(v => typeof v === 'string' && v.trim()) || !/^[A-Z]{3}$/.test(iso3 || '')) throw Error('Invalid country identity in ' + path);
  files[path] = createHash('sha256').update(bytes).digest('hex');
  put('_support/sources/geo/' + path, bytes);
  records.push({
    id:`G:CO:${iso2}`, Name:name, name, ISO2:iso2, ISO3:iso3, OfficialName:official,
    Source:{Provider:'geo',Path:path,Pointer:'/data',Fields:{Name:'/data/name/common',OfficialName:'/data/name/official',ISO3:'/data/iso3'}},
  });
}
const countryPath = resolve(root, 'data/countries/index.json');
const dataset = JSON.parse(readFileSync(countryPath));
for (const record of dataset.records) if (!records.some(row => row.id === record.id)) throw Error(`Source removes ${record.id}; define a migration before removing a published country.`);
if (!records.length) throw Error('No country entries found.');
const changed = JSON.stringify(dataset.records) !== JSON.stringify(records);
put('data/countries/index.json', {...dataset, version: dataset.version + (changed ? 1 : 0), records});
const introduction = readFileSync(resolve(root, 'data/countries/README.md'), 'utf8').split('## Entries')[0];
put('data/countries/README.md', introduction + '## Entries\n\n' + records.map(row => `### ${row.name} — \`${row.id}\`\n\nCountry/territory code \`${row.ISO2}\`, three-letter code \`${row.ISO3}\`; official name: ${row.OfficialName}.\n\n`).join(''));
const stateSourcePath = 'data/country/US.state.json', stateBytes = sourceBytes(stateSourcePath);
files[stateSourcePath] = createHash('sha256').update(stateBytes).digest('hex');
put('_support/sources/geo/' + stateSourcePath, stateBytes);
const stateRecords = Object.entries(JSON.parse(stateBytes)).sort(([a], [b]) => a.localeCompare(b)).map(([abbreviation, row]) => {
  if (!/^[A-Z]{2}$/.test(abbreviation) || typeof row.name !== 'string' || !row.name.trim()) throw Error('Invalid US state');
  return {id:`US-${abbreviation}`, name:row.name, abbreviation, country:'G:CO:US',
    Source:{Provider:'geo',Path:stateSourcePath,Fields:{name:`/${abbreviation}/name`}}};
});
const states = JSON.parse(readFileSync(resolve(root, 'data/states/index.json')));
for (const record of states.records) if (!stateRecords.some(row => row.id === record.id)) throw Error(`Source removes ${record.id}; define a migration before removing a published state.`);
if (stateRecords.length !== 50) throw Error('Expected the 50 US states. Review changes to the source scope.');
const statesChanged = states.records.length && JSON.stringify(states.records) !== JSON.stringify(stateRecords);
put('data/states/index.json', {...states, version:states.version + (statesChanged ? 1 : 0), records:stateRecords});
const stateIntroduction = readFileSync(resolve(root, 'data/states/README.md'), 'utf8').split('## Entries')[0];
put('data/states/README.md', stateIntroduction + '## Entries\n\n' + stateRecords.map(row => `- **${row.name}** (\`${row.id}\`): US state, postal abbreviation \`${row.abbreviation}\`.\n`).join(''));
put('_support/sources/geo/LICENSE', sourceBytes('LICENSE'));
put('_support/sources/index.json', {...locks,geo:{...locks.geo,Revision:revision,Files:files}});
for (const [path, value] of outputs) {
  const file = resolve(root,path), bytes = Buffer.from(value);
  if (options.check) {
    if (!readFileSync(file).equals(bytes)) throw Error('Imported file differs: ' + path);
  } else { mkdirSync(dirname(file),{recursive:true}); writeFileSync(file,bytes); }
}
console.log(`${options.check ? 'Verified' : 'Imported'} ${records.length} countries and ${stateRecords.length} US states at ${revision}.`);
