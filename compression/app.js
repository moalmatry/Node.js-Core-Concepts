const zlib = require("zlib");

zlib.createGzip();

// const fs = require('fs');

// const fileName = 'text.txt';
// const content = '1';
// const iterations = 100000000;

// const writeStream = fs.createWriteStream(fileName);

// for (let i = 0; i < iterations; i++) {
//     writeStream.write(content);
// }

// writeStream.end();

// writeStream.on('finish', () => {
//     console.log('File has been written successfully.');
// });

// writeStream.on('error', (err) => {
//     console.error('An error occurred:', err.message);
// });
