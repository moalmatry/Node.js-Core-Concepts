const fs = require("fs/promises");
const util = {};

// delete file if it exists if not the function will not throw an error
util.deleteFile = async (path) => {
  try {
    await fs.unlink(path);
  } catch (err) {}
};

// delete folder if it exists if not the function will not throw an error
util.deleteFolder = async (path) => {
  try {
    await fs.rm(path, { recursive: true });
  } catch (err) {
    //
  }
};

module.exports = util;
