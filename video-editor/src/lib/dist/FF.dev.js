"use strict";

var _require = require("node:child_process"),
    spawn = _require.spawn;

var makeThumbnail = function makeThumbnail(fullPath, thumbnailPath) {
  // ffmpeg -i video.mp4 -ss 5 -vframes 1 thumbnail.jpg
  return new Promise(function (resolve, reject) {
    var ffmpeg = spawn("ffmpeg", ["-i", fullPath, "-ss", "5", "-vframes", "1", thumbnailPath]);
    ffmpeg.on("close", function (code) {
      if (code === 0) {
        resolve();
      } else {
        reject("FFmpeg existed with this code: ".concat(code));
      }
    });
    ffmpeg.on("error", function (err) {
      reject(err);
    });
  });
};

var getDimensions = function getDimensions(fullPath) {
  // ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 video.mp4
  return new Promise(function (resolve, reject) {
    var ffprobe = spawn("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", fullPath]);
    var dimensions = "";
    ffprobe.stdout.on("data", function (data) {
      dimensions += data.toString("utf8");
    });
    ffprobe.on("close", function (code) {
      if (code === 0) {
        dimensions = dimensions.replace(/\s/g, "").split(",");
        resolve({
          width: Number(dimensions[0]),
          height: Number(dimensions[1])
        });
      } else {
        reject("FFprobe existed with this code: ".concat(code));
      }
    });
    ffprobe.on("error", function (err) {
      reject(err);
    });
  });
};

module.exports = {
  makeThumbnail: makeThumbnail,
  getDimensions: getDimensions
};