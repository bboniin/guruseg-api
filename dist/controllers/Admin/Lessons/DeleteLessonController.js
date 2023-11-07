"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLessonController = void 0;

var _DeleteLessonService = require("../../../services/Admin/Lessons/DeleteLessonService");

class DeleteLessonController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const deleteLessonService = new _DeleteLessonService.DeleteLessonService();
    const lesson = await deleteLessonService.execute({
      id,
      userId
    });
    return res.json(lesson);
  }

}

exports.DeleteLessonController = DeleteLessonController;