import Butter from "./butter.mjs";

const port = 8000;

const server = new Butter();

server.route("get", "/", (req, res) => {
  res.sendFiles("public/index.html", "text/html");
});
server.route("get", "/styles.css", (req, res) => {
  res.sendFiles("public/styles.css", "text/css");
});

server.route("get", "/script.js", (req, res) => {
  res.sendFiles("public/script.js", "text/javascript");
});

server.route("post ", "/login", (req, res) => {
  res.status(400).json({ message: "Bad login info." });
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
