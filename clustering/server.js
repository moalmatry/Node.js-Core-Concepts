// import cpeak from "cpeak";
const cpeak = require("cpeak");
const server = new cpeak();

process.on("message", (message) => {
  console.log(`${process.pid} received this message: ${message}`);
});
server.route("get", "/", (req, res) => {
  process.send({ action: "request" });
  res.json({ message: "This is some text" });
});

server.route("get", "/heavy", (req, res) => {
  process.send({ action: "request" });
  for (let i = 0; i < 10000000000; i++) {}

  res.json({ message: "Heavy operation completed" });
});

server.listen(5000, () => {
  console.log("Server listening on port " + 5000);
});
