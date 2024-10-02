import net from "net";
import fs from "fs/promises";
import path from "path";
const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
  const filePath = process.argv[2];
  const fileName = path.basename(filePath);
  const fileHandle = await fs.open(filePath, "r");
  const fileReadStream = fileHandle.createReadStream(); // the stream to read from
  const fileSize = (await fileHandle.stat()).size;

  //   For showing upload progress
  let uploadPercentage = 0;
  let bytesUploaded = 0;

  socket.write(`fileName: ${fileName}------`);
  // Reading from the source file
  fileReadStream.on("data", (data) => {
    if (!socket.write(data)) {
      fileReadStream.pause();
    }
    bytesUploaded += data.length; // add number of bytes
    let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);
    if (newPercentage % 5 === 0 && newPercentage !== uploadPercentage) {
      uploadPercentage = newPercentage;
      console.log("uploading " + uploadPercentage);
    }
  });

  socket.on("drain", () => {
    fileReadStream.resume();
  });

  fileReadStream.on("end", () => {
    console.log("The file was successfully uploaded!");
    socket.end();
  });
});
