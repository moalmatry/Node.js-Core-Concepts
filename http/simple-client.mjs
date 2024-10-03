import http from "http";

const agent = new http.Agent({
  keepAlive: true,
  // maxSockets: 100,
  // maxFreeSockets: 25
});

const request = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8000,
  method: "POST",
  path: "/create-post",
  headers: {
    "Content-Type": "application/json",
  },
});

// work only once
request.on("response", (response) => {});

request.write(JSON.stringify({ message: "hellos world" }));
request.write(JSON.stringify({ message: "how are you" }));
request.write(JSON.stringify({ message: "still there" }));

request.end(JSON.stringify({ message: "this will be my last message?" }));
