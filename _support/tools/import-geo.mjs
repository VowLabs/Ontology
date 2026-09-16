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
const outputs = new Map(), files = {}, children = {};
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
  children[iso2] = {$ref:`./${iso2}/index.json`};
  put(`Geography/Country/${iso2}/index.json`, {
    Name:name, Description:`Country or territory identified as ${iso2} in the pinned ekkis/geo dataset. This classification identifies a geographic entity, not an address format.`,
    ISO2:iso2, ISO3:iso3, OfficialName:official,
    Source:{Provider:'geo',Path:path,Pointer:'/data',Fields:{Name:'/data/name/common',OfficialName:'/data/name/official',ISO3:'/data/iso3'}},Children:{},
  });
  put(`Geography/Country/${iso2}/README.md`, `# ${name}\n\nCanonical code: \`G:CO:${iso2}\`. [Definition](index.json).\n\nThis is a country or territory entry from the pinned \`ekkis/geo\` dataset. The\nsource’s common name is **${name}** and its official name is **${official}**.\nIts two-letter key is \`${iso2}\` and its three-letter code is \`${iso3}\`.\nThese identifiers follow the source vocabulary; inclusion does not assert\nsovereignty or resolve jurisdictional disputes.\n\nUse \`G:CO:${iso2}\` for a country relationship, for example as a Country choice in an\naddress. The country concept is distinct from a country-specific postal format.\nNo finer subclasses are currently imported. Capital, currency, population and\nsubdivision data in the upstream repository are outside this imported vocabulary.\n\nSource: [${path}](https://github.com/ekkis/geo/blob/${revision}/${path}),\nrevision \`${revision}\`. [Country list](../README.md) ·\n[Source and refresh policy](../../../_support/sources/README.md).\n`);
}
const countryPath = resolve(root, 'Geography/Country/index.json');
const branch = JSON.parse(readFileSync(countryPath));
for (const code of Object.keys(branch.Children)) if (!children[code]) throw Error(`Source removes ${code}; define a migration before removing a published country.`);
if (!Object.keys(children).length) throw Error('No country entries found.');
put('Geography/Country/index.json', {...branch, Children:children});
put('_support/sources/geo/LICENSE', sourceBytes('LICENSE'));
put('_support/sources/index.json', {...locks,geo:{...locks.geo,Revision:revision,Files:files}});
for (const [path, value] of outputs) {
  const file = resolve(root,path), bytes = Buffer.from(value);
  if (options.check) {
    if (!readFileSync(file).equals(bytes)) throw Error('Imported file differs: ' + path);
  } else { mkdirSync(dirname(file),{recursive:true}); writeFileSync(file,bytes); }
}
console.log(`${options.check ? 'Verified' : 'Imported'} ${Object.keys(children).length} countries at ${revision}.`);
