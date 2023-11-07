"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLessonController = void 0;

var _CreateLessonService = require("../../../services/Admin/Lessons/CreateLessonService");

class CreateLessonController {
  async handle(req, res) {
    const {
      name,
      description,
      video,
      file_name,
      course_id,
      order
    } = req.body;
    let file = "";
    let userId = req.userId;

    if (req.file) {
      file = req.file.filename;
    }

    const createLessonService = new _CreateLessonService.CreateLessonService();
    const lesson = await createLessonService.execute({
      userId,
      name,
      description,
      video,
      file_name,
      file,
      course_id,
      order
    });
    return res.json(lesson);
  }

}

exports.CreateLessonController = CreateLessonController;