import fs from "fs/promises";

(async () => {
  const createFile = async (path) => {
    let existingFileHandle;

    try {
      existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();

      return console.log(`The file ${path} already exists`);
    } catch (e) {
      // we don't have file
      const newFileHandle = await fs.open(path, "w");
      console.log(`The file ${path} has been created`);
      newFileHandle.close();
    }

    // try {
    //   await fs.writeFile(path, "Hello, world!");
    //   console.log("File created and saved!");
    // } catch (err) {
    //   console.error(err);
    // }
  };
  // commands
  const CREATE_FILE = "create a file";
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
    const command = buff.toString("utf8");

    // create file:
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  // watcher
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") commandFileHandler.emit("change");
  }
})();
