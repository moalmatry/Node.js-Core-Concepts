import fs from "fs/promises";

(async () => {
  // commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const RENAME_FILE = "rename a file";
  const ADD_TO_FILE = "add to the file ";
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

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log(`successfully deleted ${path}`);
    } catch (error) {
      console.log("file not found");
      console.error("there was an error:", error.message);
    }
  };

  const renameFile = async (oldPath, newPath) => {
    // console.log(`${oldPath} rename to ${newPath}`);

    try {
      await fs.rename(oldPath, newPath);
      const stats = await fs.stat(oldPath);
      console.log(`stats: ${JSON.stringify(stats)}`);
    } catch (error) {
      console.error("there was an error:", error.message);
    }
  };

  const addToFile = async (path, content) => {
    console.log(`adding ${path} to ${content}`);
  };

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
    // delete file
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);
      renameFile(oldFilePath, newFilePath);
    }

    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length, _idx);
      const content = command.substring(_idx + 15);
      addToFile(filePath, content);
    }
  });

  // watcher
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") commandFileHandler.emit("change");
  }
})();
