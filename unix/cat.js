const { stdin, stdout, stderr, argv } = require("process");
const fs = require("fs");

// get the first argument
const filePath = argv[2];

if (filePath) {
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(stdout);
  fileStream.on("end", () => {
    process.exit(1);
  });
}

if (!filePath) {
  console.error("Please provide a file path.");
  process.exit(1);
}

stdin.on("data", (data) => {
  stdout.write(data.toString("utf8").toUpperCase());
});
