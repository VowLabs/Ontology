import { createOntologyServer } from './api.mjs';
const port = Number(process.env.PORT ?? 24108);
const host = process.env.HOST ?? '127.0.0.1';
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer from 1 to 65535.');
const server = createOntologyServer();
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, host, () => console.log(`VL Ontology API listening on http://${host}:${port}/v1`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
  server.close(() => process.exit(0));
  setTimeout(() => { server.closeAllConnections(); process.exit(0); }, 5000).unref();
});
