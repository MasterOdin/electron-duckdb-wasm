# electron-duckdb-wasm

Repository demonstrates how `@duckdb/duckdb-wasm` will fail to load under electron
if the `nodeIntegrationInWorker` flag is enabled. When toggling the flag on in
`main.js`, then will see the following error in console:

```
TypeError: ic(...).dirname is not a function
    at cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.27.0/dist/duckdb-browser-eh.worker.js:10:59232
    at Go.instantiateImpl (cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.27.0/dist/duckdb-browser-eh.worker.js:11:25177)
    at Go.instantiate (cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.27.0/dist/duckdb-browser-eh.worker.js:11:15869)
    at lc.instantiate (cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.27.0/dist/duckdb-browser-eh.worker.js:24:10893)
    at lc.onMessage (cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.27.0/dist/duckdb-browser-eh.worker.js:10:53913)
    at Qu.globalThis.onmessage (cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.27.0/dist/duckdb-browser-eh.worker.js:24:10976)
```

Disabling it, and the app loads fine, and can see the result of the query get
returned as expected.

Line of code to change: https://github.com/MasterOdin/electron-duckdb-wasm/blob/1cd5f871eac0fa1a24d9807b0f8a9ab4eac3c78f/main.js#L14
Upstream issue: https://github.com/duckdb/duckdb-wasm/issues/1432
