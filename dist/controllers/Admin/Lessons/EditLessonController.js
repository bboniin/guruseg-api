"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLessonController = void 0;

var _EditLessonService = require("../../../services/Admin/Lessons/EditLessonService");

class EditLessonController {
  async handle(req, res) {
    const {
      name,
      description,
      video,
      file_name,
      order,
      delete_file
    } = req.body;
    const {
      id
    } = req.params;
    let file = "";
    let userId = req.userId;

    if (req.file) {
      file = req.file.filename;
    }

    const editLessonService = new _EditLessonService.EditLessonService();
    const lesson = await editLessonService.execute({
      userId,
      name,
      description,
      video,
      file_name,
      order,
      file,
      id,
      delete_file
    });

    if (lesson["file"]) {
      lesson["file_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + lesson["file"];
    }

    return res.json(lesson);
  }

}

exports.EditLessonController = EditLessonController;