"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCourseService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteCourseService {
  async execute({
    id
  }) {
    const course = await _prisma.default.course.findFirst({
      where: {
        id: id
      }
    });
    if (course.photo) {
      const s3Storage = new _S3Storage.default();
      await s3Storage.deleteFile(course["photo"]);
    }
    const courseD = await _prisma.default.course.delete({
      where: {
        id: id
      }
    });
    return courseD;
  }
}
exports.DeleteCourseService = DeleteCourseService;