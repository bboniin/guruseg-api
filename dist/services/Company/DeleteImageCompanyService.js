"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteImageCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteImageCompanyService {
  async execute({
    id
  }) {
    if (!id) {
      throw new Error("Id da imagem é obrigatório");
    }
    const image = await _prisma.default.companyImages.findFirst({
      where: {
        id: id
      }
    });
    const s3Storage = new _S3Storage.default();
    await s3Storage.deleteFile(image["photo"]);
    const imageDelete = await _prisma.default.companyImages.delete({
      where: {
        id: id
      }
    });
    return imageDelete;
  }
}
exports.DeleteImageCompanyService = DeleteImageCompanyService;