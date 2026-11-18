"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCourseService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditCourseService {
  async execute({
    name,
    description,
    module_id,
    order,
    photo,
    id
  }) {
    const course = await _prisma.default.course.findUnique({
      where: {
        id: id
      }
    });
    if (!name) {
      throw new Error("Nome do curso é obrigatório");
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
      module_id: module_id,
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
    const s3Storage = new _S3Storage.default();
    if (courseRes.photo) {
      courseRes["photo_url"] = await s3Storage.getTemporaryUrl(courseRes.photo, 245);
    }
    return courseRes;
  }
}
exports.EditCourseService = EditCourseService;