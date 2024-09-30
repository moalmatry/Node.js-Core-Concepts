import net from "net";
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = async (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

const socket = net.createConnection(
  {
    host: "127.0.0.1",
    port: 8000,
  },
  async () => {
    console.log("connected to the server");

    const ask = async () => {
      const message = await rl.question("enter message > ");
      // move cursor to upper
      await moveCursor(0, -1);
      // clear the current line
      await clearLine(0);
      socket.write(`${id}-message-${message}`);
    };

    ask();
    socket.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      if (data.toString("utf-8").substring(0, 2) === "id") {
        // when getting id
        id = data.toString("utf-8").substring(3);

        console.log(`welcome to our server - your id is ${id} !\n`);
      } else {
        // when getting message

        console.log(data.toString("utf-8"));
        await ask();
      }
    });
  }
);

// when the connection is ended with the server
socket.on("end", () => {
  console.log("connection was ended");
});
