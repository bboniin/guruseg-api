"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmLessonService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ConfirmLessonService {
  async execute({
    userId,
    lessonId
  }) {
    const lessonConfirm = await _prisma.default.lessonConfirm.findUnique({
      where: {
        user_id_lesson_id: {
          user_id: userId,
          lesson_id: lessonId
        }
      }
    });
    if (lessonConfirm) {
      throw new Error("Aula já foi confirmada");
    }
    const confirm = await _prisma.default.lessonConfirm.create({
      data: {
        user_id: userId,
        lesson_id: lessonId
      }
    });
    return confirm;
  }
}
exports.ConfirmLessonService = ConfirmLessonService;