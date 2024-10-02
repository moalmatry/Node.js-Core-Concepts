import dgram from "dgram";

const sender = dgram.createSocket("udp4");

sender.send("This is string", 8000, "127.0.0.1", (error, bytes) => {
  if (error) console.log(error);
  console.log(bytes);
});
