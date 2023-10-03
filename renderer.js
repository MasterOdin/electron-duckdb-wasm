const duckdb = require('@duckdb/duckdb-wasm');

/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

(async () => {
  if (!duckdb) {
    throw new Error('duckdb not loaded');
  }

  console.log(duckdb);

  const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

  // Select a bundle based on browser checks
  const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

  const worker_url = URL.createObjectURL(
    new Blob([`importScripts("${bundle.mainWorker}");`], {type: 'text/javascript'})
  );

  // Instantiate the asynchronus version of DuckDB-wasm
  const worker = new Worker(worker_url);
  const logger = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  URL.revokeObjectURL(worker_url);

  const c = await db.connect();
  const r = await c.query('SELECT 42 AS the_answer');
  for (const [obj] of r) {
    console.log(obj);
    document.getElementById('duckdb-results').innerHTML += `${obj.join(': ')}`;
  }
  await c.close();

  console.log('duckdb loaded');
})()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.log('error');
    console.error(err);
  })
