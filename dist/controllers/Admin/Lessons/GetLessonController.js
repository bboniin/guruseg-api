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
    const getLessonService = new _GetLessonService.GetLessonService();
    const lesson = await getLessonService.execute({
      id
    });
    return res.json(lesson);
  }
}
exports.GetLessonController = GetLessonController;