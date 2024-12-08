const fs = require("node:fs");
const path = require("node:path");
require("./file.js");

console.log(__dirname);
console.log(process.cwd());
const content = fs.readFileSync(path.join(__dirname, "./text.txt"), "utf8");
console.log(content);

// What do these relative paths depend on?
