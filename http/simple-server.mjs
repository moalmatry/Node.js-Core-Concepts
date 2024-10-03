import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("----Method-----");
  console.log(req.method);
  console.log("----Url-----");
  console.log(req.url);
  console.log("----Headers-----");
  console.log(req.headers);

  console.log("----Body-----");
  req.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });
});

server.listen(8000, () => {
  console.log("listening on port 8000");
});
