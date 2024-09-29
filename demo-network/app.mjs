import http from "http";

const port = 8000;
const server = http.createServer((req, res) => {
  const data = { message: "Hello world" };
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Connection", "close");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server is running at http://localhost:${port}`);
});
