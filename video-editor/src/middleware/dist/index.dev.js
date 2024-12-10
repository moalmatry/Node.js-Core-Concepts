"use strict";

var DB = require("../DB");

exports.authenticate = function (req, res, next) {
  var routesToAuthenticate = ["GET /api/user", "PUT /api/user", "DELETE /api/logout" // "POST /api/upload-video",
  // "GET /api/videos",
  ];

  if (routesToAuthenticate.indexOf(req.method + " " + req.url) !== -1) {
    // console.log(req.headers.cookie);
    // If we have a token cookie, then save the userId to the req object
    if (req.headers.cookie) {
      var token = req.headers.cookie.split("=")[1];
      DB.update();
      var session = DB.sessions.find(function (session) {
        return session.token === token;
      });

      if (session) {
        req.userId = session.userId;
        return next();
      }
    }

    return res.status(401).json({
      error: "Unauthorized"
    });
  } else {
    next();
  }
};

exports.serverIndex = function (req, res, next) {
  var routes = ["/", "/login", "/profile"];

  if (routes.indexOf(req.url) !== -1 && req.method === "GET") {
    return res.status(200).sendFile("./public/index.html", "text/html");
  } else {
    next();
  }
};