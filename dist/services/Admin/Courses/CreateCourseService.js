"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCourseService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateCourseService {
  async execute({
    name,
    photo,
    order,
    module_id,
    description
  }) {
    if (!name) {
      throw new Error("Nome do curso é obrigatório");
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
        module_id: module_id,
        order: orderC
      }
    });
    const s3Storage = new _S3Storage.default();
    if (courseRes.photo) {
      courseRes["photo_url"] = await s3Storage.getTemporaryUrl(courseRes.photo, 245);
    }
    return courseRes;
  }
}
exports.CreateCourseService = CreateCourseService;