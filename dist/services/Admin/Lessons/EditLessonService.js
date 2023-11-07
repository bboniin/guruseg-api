"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLessonService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditLessonService {
  async execute({
    name,
    userId,
    file,
    delete_file,
    description,
    order,
    video,
    id,
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

    const lesson = await _prisma.default.lesson.findUnique({
      where: {
        id: id
      }
    });

    if (!name || !file && !description && !video) {
      throw new Error("Preencha o Nome da aula e algum conteúdo");
    }

    if (!lesson) {
      throw new Error("Aula não existe");
    }

    let orderC = parseInt(order);

    if (!orderC) {
      orderC = 0;
    }

    let data = {
      name: name,
      description: description,
      video: video,
      file_name: file_name,
      order: orderC
    };

    if (delete_file) {
      if (lesson.file) {
        const s3Storage = new _S3Storage.default();
        await s3Storage.deleteFile(lesson["file"]);
        data["file"] = "";
      }
    }

    if (file) {
      const s3Storage = new _S3Storage.default();

      if (lesson["file"]) {
        await s3Storage.deleteFile(lesson["file"]);
      }

      const upload = await s3Storage.saveFile(file);
      data["file"] = upload;
    }

    const lessonRes = await _prisma.default.lesson.update({
      where: {
        id: id
      },
      data: data
    });
    return lessonRes;
  }

}

exports.EditLessonService = EditLessonService;