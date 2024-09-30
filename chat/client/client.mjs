import net from "net";
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = net.createConnection(
  {
    host: "127.0.0.1",
    port: 8000,
  },
  async () => {
    console.log("connected to the server");

    const message = await rl.question("enter message => ");

    socket.write(message);
  }
);
socket.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

// when the connection is ended with the server
socket.on("end", () => {
  console.log("connection was ended");
});
