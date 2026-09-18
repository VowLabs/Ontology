import { createOntologyServer } from './api.mjs';
const port = Number(process.env.PORT ?? 24108);
const production = process.env.NODE_ENV === 'production';
const host = String(process.env.HOST || (production ? '127.0.0.1' : '0.0.0.0')).trim();
if (production && !['127.0.0.1', '::1', 'localhost'].includes(host)) {
  throw new Error('HOST must be loopback in production; expose Ontology through a reverse proxy instead');
}
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer from 1 to 65535.');
const server = createOntologyServer({delegationUrls: process.env.GEO_ONTOLOGY_URL ? {geo: process.env.GEO_ONTOLOGY_URL} : production ? {} : {geo: 'http://127.0.0.1:24109/v1/'}});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, host, () => console.log(`VL Ontology API listening on http://${host}:${port}/v1`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
  server.close(() => process.exit(0));
  setTimeout(() => { server.closeAllConnections(); process.exit(0); }, 5000).unref();
});
