"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCourseService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditCourseService {
  async execute({
    name,
    description,
    restricted,
    userId,
    order,
    photo,
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

    const course = await _prisma.default.course.findUnique({
      where: {
        id: id
      }
    });

    if (!name) {
      throw new Error("Nome do curso é obrigátorio");
    }

    if (!course) {
      throw new Error("course não existe");
    }

    let orderC = parseInt(order);

    if (!orderC) {
      orderC = 0;
    }

    let data = {
      name: name,
      restricted: restricted,
      description: description,
      order: orderC
    };

    if (photo) {
      const s3Storage = new _S3Storage.default();

      if (course["photo"]) {
        await s3Storage.deleteFile(course["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }

    const courseRes = await _prisma.default.course.update({
      where: {
        id: id
      },
      data: data
    });
    return courseRes;
  }

}

exports.EditCourseService = EditCourseService;