"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLessonService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteLessonService {
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