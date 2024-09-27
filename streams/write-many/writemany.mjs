import fs from "fs/promises";
// import fs from "fs";

// (async () => {
//   console.time("time");
//   const fileHandle = await fs.open("test.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(` ${i} `);
//   }

//   console.timeEnd("time");
// })();

// (async () => {
//   console.time("time: ");
//   fs.open("test.txt", "w", (_, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       fs.write(fd, ` ${i} `, () => {});
//     }
//   });
//   console.timeEnd("time: ");
// })();

// (async () => {
//   console.time("time");
//   const fileHandle = await fs.open("test.txt", "w");

//   const stream = fileHandle.createWriteStream();

//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(` ${i} `, "utf-8");
//     stream.write(buff);
//     // await fileHandle.write(` ${i} `);
//   }

//   console.timeEnd("time");
// })();

// const writeMillion = async () => {
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       fs.write(fd, ` ${i} `, () => {});
//     }
//   });
// };

(async () => {
  console.time("time");
  const filehandle = await fs.open("test.txt", "w");
  const stream = filehandle.createWriteStream();
  console.log(stream.writableHighWaterMark);
  //   const buff = Buffer.alloc(16383, " 10 ");
  //   console.log(stream.write(buff));
  //   console.log(stream.write(Buffer.alloc(1, " a ")));
  //   console.log(stream.write(Buffer.alloc(1, " a ")));
  //   console.log(stream.write(Buffer.alloc(1, " a ")));

  //   console.log(stream.writableLength);

  //   stream.on("drain", () => {
  //     console.log(stream.write(Buffer.alloc(1, "a")));
  //     console.log(stream.writableLength);

  //     console.log("we are now safe to write more!");
  //   });

  let i = 0;
  const writeMany = () => {
    while (i < 10000000) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      //   this our last write
      if (i === 10000000 - 1) {
        return stream.end(buff);
      }
      if (!stream.write(buff)) break;
      i++;
    }
  };

  writeMany();

  stream.on("drain", () => {
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("time");
    filehandle.close();
  });
})();
