import http from "http";
import fs from "fs/promises";

class Butter {
  constructor() {
    this.server = http.createServer();
    /**
     * get/ : () => { ... }
     * post/upload: () => { ... }
     */
    this.routes = {};

    this.server.on("request", (req, res) => {
      res.sendFiles = async (path, mime) => {
        // Send a file back to a client
        const fileHandle = await fs.open(path, "r");
        const fileStream = fileHandle.createReadStream();
        res.setHeader("Content-Type", mime);
        fileStream.pipe(res);
      };

      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      // if the routes object doesn't have a key req.method + req.url return 404
      if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
        return res
          .status(404)
          .json({ error: `Cant not ${req.method} ${req.url}` });
      }

      this.routes[req.method.toLowerCase() + req.url](req, res);
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }
  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

export default Butter;
