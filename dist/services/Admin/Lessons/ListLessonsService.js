"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLessonsService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListLessonsService {
  async execute({
    course_id
  }) {
    const lessons = await _prisma.default.lesson.findMany({
      where: {
        course_id: course_id
      },
      orderBy: {
        order: "asc"
      },
      include: {
        confirms: true
      }
    });
    const s3Storage = new _S3Storage.default();
    const lessonsResponse = await Promise.all(lessons.map(async lesson => {
      if (lesson.file) {
        lesson["file_url"] = await s3Storage.getTemporaryUrl(lesson.file, 245);
      }
      return lesson;
    }));
    return lessonsResponse;
  }
}
exports.ListLessonsService = ListLessonsService;