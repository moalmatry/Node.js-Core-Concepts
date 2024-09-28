// const fs = require("fs");
// const file = fs.createWriteStream("big.file");

// console.time("time");
// for (let i = 0; i <= 1e6; i++) {
//   file.write(
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n"
//   );
// }

// file.end();
// console.timeEnd("time");

// const fs = require("fs");
// const server = require("http").createServer();

// server.on("request", (req, res) => {
//   const src = fs.createReadStream("big.file");

//   src.pipe(res);
// });

// server.listen(8000);

// const { Writable } = require("stream");

// // class myWritableStream extends Writable {}

// const outStream = new Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString());
//     callback();
//   },
// });

// process.stdin.pipe(outStream);

const { Readable } = require("stream");

// const inStream = new Readable({
//   read() {},
// });

// inStream.push("hello world ");
// inStream.push("Mohamed Almatry");

// inStream.push(null);

// inStream.pipe(process.stdout);

const inStream = new Readable({
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  },
});

inStream.currentCharCode = 65;

inStream.pipe(process.stdout);
