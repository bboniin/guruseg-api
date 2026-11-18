"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBannerService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditBannerService {
  async execute({
    url,
    types,
    photo,
    id
  }) {
    const banner = await _prisma.default.banner.findUnique({
      where: {
        id: id
      }
    });
    if (!url) {
      throw new Error("Preencha a Url do banner");
    }
    if (!types) {
      throw new Error("Preencha os visualizadores do banner");
    }
    if (!banner) {
      throw new Error("Banner não existe");
    }
    let data = {
      url: url,
      types: types
    };
    if (photo) {
      const s3Storage = new _S3Storage.default();
      if (banner["photo"]) {
        await s3Storage.deleteFile(banner["photo"]);
      }
      const upload = await s3Storage.saveFile(photo);
      data["photo"] = upload;
    }
    const bannerRes = await _prisma.default.banner.update({
      where: {
        id: id
      },
      data: data
    });
    const s3Storage = new _S3Storage.default();
    if (bannerRes.photo) {
      bannerRes["photo_url"] = await s3Storage.getTemporaryUrl(bannerRes.photo, 245);
    }
    return bannerRes;
  }
}
exports.EditBannerService = EditBannerService;