const { Buffer } = require("buffer");

// safe but slower
const buffer = Buffer.alloc(10000, 0);

// faster but not safe because buffer has data
// const unSafeBuffer = Buffer.allocUnsafe(10000);

// for (let i = 0; i < buffer.length; i++) {
//   if (buffer[i] !== 0) {
//     console.log(`Element ${i}: ${buffer[i].toString(2)}`);
//   }
// }
// console.log(30 << 1);
