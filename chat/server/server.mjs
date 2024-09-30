import net from "net";

const server = net.createServer();

// array to hold all connected clients. This is a basic implementation. In a real-world scenario, you'd want to use a more efficient data structure like a Set or Map.
const clients = [];
server.on("connection", (socket) => {
  console.log("new connection to the server");
  const clientId = clients.length + 1;

  // broadcast to all connected clients when someone connected
  clients.map((client) => client.socket.write(`User ${clientId} joined !`));

  socket.write(`id-${clientId}`);
  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    clients.map((client) => client.socket.write(`> User ${id}: ${message}`));
    socket.write(data);
  });

  // write messages to every one when some one leaves from chat room
  socket.on("end", () => {
    clients.map((client) => client.socket.write(`User ${clientId} left!`));
  });
  socket.on("error", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  clients.push({
    id: String(clientId),
    socket,
  });
});

// start the server in 8000 port
server.listen(8000, "127.0.0.1", () => {
  console.log(`listening on `, server.address());
});
