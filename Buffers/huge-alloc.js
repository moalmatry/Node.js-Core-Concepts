const { Buffer, constants } = require("buffer");

const b = Buffer.alloc(1e9); // 1,000,000,000

// setInterval(() => {
//   //   for (let i = 0; i < b.length; i++) {
//   //     b[i] = 0x22;
//   //   }
//   b.fill(0x22);
// }, 5000);

console.log(constants.MAX_LENGTH);
