"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLessonService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateLessonService {
  async execute({
    name,
    userId,
    file,
    description,
    video,
    order,
    course_id,
    file_name
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    if (!name || !file && !description && !video) {
      throw new Error("Preencha o Nome da aula e algum conteúdooo");
    }

    if (file) {
      const s3Storage = new _S3Storage.default();
      await s3Storage.saveFile(file);
    }

    let orderC = parseInt(order);

    if (!orderC) {
      orderC = 0;
    }

    const lessonRes = await _prisma.default.lesson.create({
      data: {
        name: name,
        description: description,
        video: video,
        file_name: file_name,
        course_id: course_id,
        file: file,
        order: orderC
      }
    });
    return lessonRes;
  }

}

exports.CreateLessonService = CreateLessonService;