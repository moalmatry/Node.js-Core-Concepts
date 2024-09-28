import { Readable } from "stream";
import fs from "fs";

class FileReadStream extends Readable {
  constructor({ highWaterMark, filename }) {
    super({ highWaterMark });
    this.filename = filename;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.filename, "r", (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();
    });
  }

  _read(size) {
    // this.push(null);
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (error, bytesRead) => {
      if (error) return this.destroy(error);
      //   null is to indicate the end of the stream
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
    });
  }

  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => {
        return callback(error || err);
      });
    } else {
      callback(error);
    }
  }
}

const stream = new FileReadStream({ filename: "text.txt" });

stream.on("data", (chunk) => {
  console.log(chunk);
});

stream.on("end", () => {
  console.log("end of file");
});
