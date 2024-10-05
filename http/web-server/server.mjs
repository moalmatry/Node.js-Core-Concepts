import http from "http";
import fs from "fs/promises";

const server = http.createServer();

server.on("request", async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    const fileHandle = await fs.open("./public/index.html", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }
  if (req.url === "/styles.css" && req.method === "GET") {
    res.setHeader("Content-Type", "text/css");
    const fileHandle = await fs.open("./public/styles.css", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(res);
  }
});

server.listen(8000, () => {
  console.log(`listening on port 8000`);
});
