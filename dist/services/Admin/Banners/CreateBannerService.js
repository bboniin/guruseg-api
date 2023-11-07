"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateBannerService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateBannerService {
  async execute({
    url,
    types,
    userId,
    photo
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    if (!url || !photo || !types) {
      throw new Error("Preencha a Url, visualizadores e a Imagem do banner");
    }

    const s3Storage = new _S3Storage.default();
    await s3Storage.saveFile(photo);
    const bannerRes = await _prisma.default.banner.create({
      data: {
        url: url,
        types: types,
        photo: photo
      }
    });
    return bannerRes;
  }

}

exports.CreateBannerService = CreateBannerService;