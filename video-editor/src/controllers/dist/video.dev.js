"use strict";

var path = require("node:path");

var crypto = require("node:crypto");

var fs = require("node:fs/promises");

var _require = require("node:stream/promises"),
    pipeline = _require.pipeline;

var util = require("../lib/util");

var DB = require("../DB");

var FF = require("../lib/FF");

var getVideos = function getVideos(req, res, handleErr) {
  var name = req.params.get("name");

  if (name) {
    res.json({
      message: "Your name is ".concat(name)
    });
  } else {
    return handleErr({
      status: 400,
      message: "Please specify a name."
    });
  }
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

var controller = {
  getVideos: getVideos,
  uploadVideo: uploadVideo
};
module.exports = controller;