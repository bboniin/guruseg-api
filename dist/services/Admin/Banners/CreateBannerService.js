"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateBannerService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateBannerService {
  async execute({
    url,
    types,
    photo
  }) {
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