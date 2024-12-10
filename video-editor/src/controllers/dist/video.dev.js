"use strict";

var path = require("node:path");

var crypto = require("node:crypto");

var fs = require("node:fs/promises");

var _require = require("node:stream/promises"),
    pipeline = _require.pipeline;

var util = require("../lib/util");

var DB = require("../DB");

var FF = require("../lib/FF"); // Return the list of all videos that the user has uploaded


var getVideos = function getVideos(req, res, handleErr) {
  DB.update();
  var videos = DB.videos.filter(function (video) {
    return video.userId === req.userId;
  });
  res.status(200).json(videos);
}; // Upload a video file


var uploadVideo = function uploadVideo(req, res, handleErr) {
  var specifiedFileName, extension, name, videoId, FORMATS_SUPPORTED, fullPath, file, fileStream, thumbnailPath, dimensions;
  return regeneratorRuntime.async(function uploadVideo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          specifiedFileName = req.headers.filename;
          extension = path.extname(specifiedFileName).substring(1).toLowerCase();
          name = path.parse(specifiedFileName).name;
          videoId = crypto.randomBytes(4).toString("hex");
          FORMATS_SUPPORTED = ["mov", "mp4"];

          if (!(FORMATS_SUPPORTED.indexOf(extension) == -1)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", handleErr({
            status: 400,
            message: "Only these formats are allowed: mov, mp4"
          }));

        case 7:
          _context.prev = 7;
          _context.next = 10;
          return regeneratorRuntime.awrap(fs.mkdir("./storage/".concat(videoId)));

        case 10:
          fullPath = "./storage/".concat(videoId, "/original.").concat(extension); // the original video path

          _context.next = 13;
          return regeneratorRuntime.awrap(fs.open(fullPath, "w"));

        case 13:
          file = _context.sent;
          fileStream = file.createWriteStream();
          thumbnailPath = "./storage/".concat(videoId, "/thumbnail.jpg");
          _context.next = 18;
          return regeneratorRuntime.awrap(pipeline(req, fileStream));

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(FF.makeThumbnail(fullPath, thumbnailPath));

        case 20:
          _context.next = 22;
          return regeneratorRuntime.awrap(FF.getDimensions(fullPath));

        case 22:
          dimensions = _context.sent;
          DB.update();
          DB.videos.unshift({
            id: DB.videos.length,
            videoId: videoId,
            name: name,
            extension: extension,
            dimensions: dimensions,
            userId: req.userId,
            extractedAudio: false,
            resizes: {}
          });
          DB.save();
          res.status(201).json({
            status: "success",
            message: "The file was uploaded successfully!"
          });
          _context.next = 34;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](7);
          // Delete the folder
          util.deleteFolder("./storage/".concat(videoId));

          if (!(_context.t0.code !== "ECONNRESET")) {
            _context.next = 34;
            break;
          }

          return _context.abrupt("return", handleErr(_context.t0));

        case 34:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 29]]);
};

var getVideoAsset = function getVideoAsset(req, res, handleErr) {
  var videoId, type, video, file, mimeType, filename, stat, fileStream;
  return regeneratorRuntime.async(function getVideoAsset$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          videoId = req.params.get("videoId");
          type = req.params.get("type");
          DB.update();
          video = DB.videos.find(function (video) {
            return videoId === video.videoId;
          });

          if (video) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", handleErr({
            status: 404,
            message: "Video not found"
          }));

        case 6:
          _context2.t0 = type;
          _context2.next = _context2.t0 === "thumbnail" ? 9 : _context2.t0 === "original" ? 14 : 19;
          break;

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(fs.open("./storage/".concat(videoId, "/thumbnail.jpg"), "r"));

        case 11:
          file = _context2.sent;
          mimeType = "image/jpeg";
          return _context2.abrupt("break", 19);

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(fs.open("./storage/".concat(videoId, "/original.").concat(video.extension), "r"));

        case 16:
          file = _context2.sent;
          mimeType = "video/mp4";
          filename = "".concat(video.name, ".").concat(video.extension);

        case 19:
          _context2.next = 21;
          return regeneratorRuntime.awrap(file.stat());

        case 21:
          stat = _context2.sent;
          fileStream = file.createReadStream(); // Set the content-type header based on the file type

          res.setHeader("Content-Type", mimeType); // Set the content-length to the size of the file

          res.setHeader("Content-Length", stat.size);
          res.status(200);
          _context2.next = 28;
          return regeneratorRuntime.awrap(pipeline(fileStream, res));

        case 28:
          file.close();

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var controller = {
  getVideos: getVideos,
  uploadVideo: uploadVideo
};
module.exports = controller;