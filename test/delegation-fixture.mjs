import {createServer} from 'node:http';
import {loadCatalogue} from '../src/catalogue.mjs';
import {createOntologyServer} from '../src/server/api.mjs';

// A foreign HTTP authority, not an imported branch of the active catalogue.
export function foreignFixture() {
  const catalogue = loadCatalogue();
  const nodes = Object.fromEntries(Object.entries(catalogue.legacy['7.0.0'].Nodes).filter(([code]) => code === 'S:G' || code.startsWith('S:G:')).map(([code,node]) => [code,{...node,Collection:node.Scalar===false,Composite:typeof node.Scalar==='boolean' && Object.keys(node.Children||{}).length>1}]));
  const datasets = {
    countries: {id: 'countries', definitionCode: 'S:G:CO', version: 1, records: [
      {id: 'G:CO:US', name: 'United States', ISO3: 'USA', Source: {Provider: 'geo'}},
      {id: 'G:CO:CA', name: 'Canada'}
    ]},
    states: {id: 'states', definitionCode: 'S:G:SD', version: 2, records: [{id: 'US-CA', name: 'California', country: 'G:CO:US'}]}
  };
  const upstream = createOntologyServer({catalogue: {...catalogue, delegations: {}, nodes: {...catalogue.nodes, ...nodes}, datasets: {...catalogue.datasets, ...datasets}}});
  return createServer((req, res) => {
    if (req.url === '/v1/catalogue') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({data: {version: catalogue.version, nodes, datasets}, meta: {ontologyVersion: catalogue.version, revision: 'fixture'}}));
    } else upstream.emit('request', req, res);
  });
}
