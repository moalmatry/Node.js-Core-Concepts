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
    name: "Joe",
  },
});

// work only once
request.on("response", (response) => {
  console.log("***************Status***************");
  console.log(response.statusCode);
  console.log("***************Header***************");
  console.log(response.headers);
  console.log("***************Body***************");
  response.on("data", (chunk) => {
    console.log(chunk.toString());
  });
  response.on("end", () => {
    console.log("***************No more data***************");
  });
});

request.write(
  JSON.stringify({
    title: "Title of my post",
    body: "This some text and more and more",
  })
);
