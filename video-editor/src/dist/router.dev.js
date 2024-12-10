"use strict";

// Controllers
var User = require("./controllers/user");

var Video = require("./controllers/video");

module.exports = function (server) {
  // ------------------------------------------------ //
  // ************ USER ROUTES ************* //
  // ------------------------------------------------ //
  // Log a user in and give them a token
  server.route("post", "/api/login", User.logUserIn); // Log a user out

  server.route("delete", "/api/logout", User.logUserOut); // Send user info

  server.route("get", "/api/user", User.sendUserInfo); // Update a user info

  server.route("put", "/api/user", User.updateUser); // ------------------------------------------------ //
  // ************ USER ROUTES ************* //
  // ------------------------------------------------ //
  // Return the list of all videos that the user has uploaded

  server.route("get", "/api/videos", Video.getVideos); // Upload a video file

  server.route("post", "/api/upload-video", Video.uploadVideo);
  server.route("get", "/get-video-asset", Video.getVideoAsset);
};