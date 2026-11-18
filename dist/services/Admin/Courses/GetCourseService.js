"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCourseService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetCourseService {
  async execute({
    course_id
  }) {
    const course = await _prisma.default.course.findUnique({
      where: {
        id: course_id
      },
      include: {
        lessons: {
          include: {
            confirms: true
          }
        }
      }
    });
    const s3Storage = new _S3Storage.default();
    const courseResponse = await Promise.all(course.lessons.map(async lesson => {
      if (lesson.file) {
        lesson["file_url"] = await s3Storage.getTemporaryUrl(lesson.file, 245);
      }
      return lesson;
    }));
    return courseResponse;
  }
}
exports.GetCourseService = GetCourseService;