"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCoursePublicService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetCoursePublicService {
  async execute({
    userId,
    course_id
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    const course = await _prisma.default.course.findUnique({
      where: {
        id: course_id
      },
      include: {
        lessons: {
          include: {
            confirms: {
              where: {
                user_id: userId
              }
            }
          }
        },
        module: true
      }
    });
    if (user.modules) {
      if (!course.module.restricted) {
        throw new Error("Você não tem acesso a esse curso");
      }
    }
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
exports.GetCoursePublicService = GetCoursePublicService;