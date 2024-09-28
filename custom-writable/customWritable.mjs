import { Writable } from "stream";
import fs from "fs";

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writeCounts = 0;
  }
  //   this will run after the constructor and it will pause all methods until we call the callback
  _construct(callback) {
    fs.open(this.fileName, "w", (error, fd) => {
      if (error) {
        // arguments mean that we have an error
        callback(error);
        return;
      } else {
        this.fd = fd;
        // no arguments means it was successful
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.writeFile(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunksSize = 0;
        ++this.writeCounts;
        callback();
      });
    } else {
      callback();
    }
    // write operation
    // const data = chunk.toString();
    // console.log(`Writing to ${this.fileName}: ${data}`);

    // when we re done we should call the callback function
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);

      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    console.log("Number of writes", this.writeCounts);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      });
    } else {
      callback(error);
    }
  }
}

const stream = new FileWriteStream({
  highWaterMark: 1800,
  fileName: "text.txt",
});

stream.write(Buffer.from("this is some string"));

stream.end(Buffer.from(" and this is the end"));

stream.on("finish", () => {
  console.log("stream completed");
});
