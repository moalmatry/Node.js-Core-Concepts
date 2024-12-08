// import cluster from "node:cluster";
// import os from "node:os";
const cluster = require("cluster");
const os = require("os");
// import server from "./server.mjs";

if (cluster.isPrimary) {
  let requestCount = 0;
  setInterval(() => {
    console.log(`Total number requests: ${requestCount}`);
  }, 5000);
  const coresCount = os.availableParallelism();
  console.log("This is the parent process");
  for (let i = 0; i < coresCount; i++) {
    const worker = cluster.fork();
    console.log(
      `The parent process spawned a new child process with PID :${worker.process.pid}`
    );
  }

  cluster.on("message", (worker, message) => {
    if (message.action && message.action === "request") {
      requestCount++;
    }
  });

  cluster.on("fork", () => {});
  cluster.on("listening", (worker, address) => {});

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} ${signal || code} died Restarting...`
    );
  });
} else {
  require("./server.js");
}

// cluster.on("exit", (worker, code, signal) => {
//   console.log(`Worker ${worker.process.pid} died`);
//   cluster.fork();
// });
