// 0100 1000 0110 1001 0010 0001
const { Buffer } = require("buffer");

const buff = Buffer.alloc(3); // 24 bits / 8 => 3 bytes

buff[0] = 0x48;
buff[1] = 0x69;
buff[3] = 0x21;

console.log(buff.toString("utf-8"));
