import fs from "fs/promises";

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    console.log("The file just changed");

    // get the of our file
    const size = (await commandFileHandler.stat()).size;
    //   Allocate buffer with the size of the file
    const buff = Buffer.alloc(size);
    //   the location at which we should start to fill buffer
    const offset = 0;
    //   how many bytes should we read
    const length = buff.byteLength;
    //  the position at which we should start reading from
    const position = 0;

    //   we always want to read the content (from beginning all the to the end)
    await commandFileHandler.read(buff, offset, length, position);
    console.log(buff.toString("utf8"));
  });

  // watcher
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") commandFileHandler.emit("change");
  }
})();
