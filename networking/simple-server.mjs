import net from "net";

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // console.log(data.toString("utf-8"));
    console.log(data);
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Server is running on port `, server.address());
});
