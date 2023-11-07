"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetLessonController = void 0;

var _GetLessonService = require("../../../services/Admin/Lessons/GetLessonService");

class GetLessonController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const getLessonService = new _GetLessonService.GetLessonService();
    const lesson = await getLessonService.execute({
      userId,
      id
    });

    if (lesson["file"]) {
      lesson["file_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + lesson["file"];
    }

    return res.json(lesson);
  }

}

exports.GetLessonController = GetLessonController;