import net from "net";

const server = net.createServer();

// array to hold all connected clients. This is a basic implementation. In a real-world scenario, you'd want to use a more efficient data structure like a Set or Map.
const clients = [];
server.on("connection", (socket) => {
  console.log("new client");
  socket.on("data", (data) => {
    clients.map((client) => client.write(data));
    socket.write(data);
  });

  clients.push(socket);
});

// start the server in 8000 port
server.listen(8000, "127.0.0.1", () => {
  console.log(`listening on `, server.address());
});
