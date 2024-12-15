const zlib = require("zlib");
const fs = require("fs");

const src = fs.createReadStream("./text.txt");
const dist = fs.createWriteStream("./text-compressed");

src.pipe(zlib.createGzip()).pipe(dist);

zlib.createGunzip();
