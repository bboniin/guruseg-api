"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCourseService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateCourseService {
  async execute({
    userId,
    name,
    photo,
    order,
    restricted,
    description
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    if (!name) {
      throw new Error("Nome do curso é obrigátorio");
    }

    if (photo) {
      const s3Storage = new _S3Storage.default();
      await s3Storage.saveFile(photo);
    }

    let orderC = parseInt(order);

    if (!orderC) {
      orderC = 0;
    }

    const courseRes = await _prisma.default.course.create({
      data: {
        name: name,
        description: description,
        photo: photo,
        restricted: restricted,
        order: orderC
      }
    });
    return courseRes;
  }

}

exports.CreateCourseService = CreateCourseService;