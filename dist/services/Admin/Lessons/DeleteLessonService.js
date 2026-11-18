"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLessonService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteLessonService {
  async execute({
    id
  }) {
    const lesson = await _prisma.default.lesson.findFirst({
      where: {
        id: id
      }
    });
    if (lesson.file) {
      const s3Storage = new _S3Storage.default();
      await s3Storage.deleteFile(lesson["file"]);
    }
    const lessonD = await _prisma.default.lesson.delete({
      where: {
        id: id
      }
    });
    return lessonD;
  }
}
exports.DeleteLessonService = DeleteLessonService;