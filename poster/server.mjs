import Butter from "./butter.mjs";

/**
 * @example { userId:1, token:232323 }
 */
const SESSIONS = [];
const USERS = [
  { id: 1, name: "Mohamed Almatry", username: "moalmatry", password: "string" },
  { id: 2, name: "Meredith Green", username: "merit", password: "string" },
  { id: 2, name: "Ben Adams", username: "ben.poet", password: "string" },
];

const POSTS = [
  {
    id: 1,
    userId: 1,
    title: "This is Post",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum accusamus ab, quo tempore porro error consequatur? Nihil natus dolore error nobis aliquid repellat, et in?",
  },
];

const PORT = 8000;

const server = new Butter();

// For Authentication
server.beforeEach((req, res, next) => {
  const routesToAuth = [
    "GET /api/user",
    "PUT /api/user",
    "POST /api/posts",
    "DELETE /api/logout",
  ];

  if (routesToAuth.indexOf(req.method + " " + req.url) !== -1) {
    // if we have a token cookie , then save the userId to the req object
    if (req.headers.cookie) {
      const token = req.headers.cookie.split("=")[1];
      const session = SESSIONS.find((session) => session.token === token);
      if (session) {
        req.userId = session.userId;
        return next();
      }
    }
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
});

// For parsing JSON body
server.beforeEach((req, res, next) => {
  if (req.headers["content-type"] === "application/json") {
  } else {
    next();
  }
});

server.beforeEach((req, res, next) => {
  console.log("Middleware three");
  next();
});

// -----Files Route-----
server.route("get", "/", (req, res) => {
  console.log("this from routes");
  res.sendFiles("public/index.html", "text/html");
});
server.route("get", "/login", (req, res) => {
  res.sendFiles("public/index.html", "text/html");
});
server.route("get", "/profile", (req, res) => {
  res.sendFiles("public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFiles("public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFiles("public/scripts.js", "text/javascript");
});

// -----Json Route-----

server.route("post", "/api/login", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString("utf-8");
  });

  req.on("end", () => {
    body = JSON.parse(body);

    const username = body.username;
    const password = body.password;

    // Check if the user exists
    const user = USERS.find((u) => u.username === username);
    if (user && user.password === password) {
      const token = Math.ceil(Math.random() * 1000000000).toString();

      SESSIONS.push({ userId: user.id, token: token });

      res.setHeader("Set-Cookie", `token=${token}; Path=/`);

      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

server.route("delete", "/api/login", () => {});

// Send user info
server.route("get", "/api/user", (req, res) => {
  const user = USERS.find((u) => u.id === req.userId);
  res.json({ username: user.username, name: user.name });
});

// update user info
server.route("put", "/api/user", (req, res) => {});

// Send all posts
server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);

    post.author = user.name;

    return post;
  });
  res.status(200).json(posts);
});

// create posts
server.route("post", "/api/posts", (req, res) => {});

server.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
// change change for git hub
