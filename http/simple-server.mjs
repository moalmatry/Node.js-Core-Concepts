import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("----Method-----");
  console.log(req.method);
  console.log("----Url-----");
  console.log(req.url);
  console.log("----Headers-----");
  console.log(req.headers);

  console.log("----Body-----");
  const name = req.headers.name;
  let data = "";
  req.on("data", (chunk) => {
    // console.log(chunk.toString());
    data += chunk.toString();
    // console.log(data);
  });

  // it should be on end but end doesn't work on windows
  req.on("data", () => {
    data = JSON.parse(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Post with title ${data.title} was created by ${name}`,
      })
    );
  });
});

server.listen(8000, () => {
  console.log("listening on port 8000");
});
