"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmLessonController = void 0;
var _ConfirmLessonService = require("../../../services/Admin/Lessons/ConfirmLessonService");
class ConfirmLessonController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const confirmLessonService = new _ConfirmLessonService.ConfirmLessonService();
    const lesson = await confirmLessonService.execute({
      userId,
      lessonId: id
    });
    return res.json(lesson);
  }
}
exports.ConfirmLessonController = ConfirmLessonController;