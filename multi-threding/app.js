const { Worker } = require("worker_threads");

new Worker("./calc.js", { workerData: { name: "text" } });
