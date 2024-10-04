import net from "net";

const client = net.createConnection(
  {
    host: "127.0.0.1",
    port: 8000,
  },
  () => {
    const req = Buffer.alloc(2);
    req[0] = 12;
    req[1] = 34;
    client.write(req);
  }
);

client.on("data", (chunk) => {
  console.log("response");
  console.log(chunk.toString("utf-8"));
  client.destroy();
});

client.on("end", () => {
  console.log("connection closed");
});
