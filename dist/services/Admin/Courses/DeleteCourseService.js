"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCourseService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteCourseService {
  async execute({
    userId,
    id
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

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