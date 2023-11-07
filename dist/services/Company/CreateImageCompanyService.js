"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateImageCompanyService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateImageCompanyService {
  async execute({
    company_id,
    file,
    index
  }) {
    console.log(company_id, file);

    if (!company_id || !file) {
      throw new Error("Preencha todos os campos obrigátorios");
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
    return image;
  }

}

exports.CreateImageCompanyService = CreateImageCompanyService;