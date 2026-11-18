"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateImageCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateImageCompanyService {
  async execute({
    company_id,
    file,
    index
  }) {
    if (!company_id || !file) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const s3Storage = new _S3Storage.default();
    await s3Storage.saveFile(file);
    const image = await _prisma.default.companyImages.create({
      data: {
        company_id: company_id,
        index: index,
        photo: file
      }
    });
    image["photo_url"] = await s3Storage.getTemporaryUrl(image.photo, 245);
    return image;
  }
}
exports.CreateImageCompanyService = CreateImageCompanyService;