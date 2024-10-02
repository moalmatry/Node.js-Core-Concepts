import dgram from "dgram";

const receiver = dgram.createSocket("udp4");

receiver.on("message", (message, remoteInfo) => {
  console.log(`Message:${message}`);
  console.log(remoteInfo);
});

receiver.bind({
  address: "127.0.0.1",
  port: 8000,
});

receiver.on("listening", () => {
  console.log("Listening on 8000");
});
