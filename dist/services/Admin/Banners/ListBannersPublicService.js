"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListBannersPublicService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListBannersPublicService {
  async execute({
    type
  }) {
    const banners = await _prisma.default.banner.findMany({
      where: {
        types: {
          contains: type
        }
      },
      select: {
        photo: true,
        url: true
      }
    });
    const s3Storage = new _S3Storage.default();
    const bannersResponse = await Promise.all(banners.map(async banner => {
      if (banner.photo) {
        banner["photo_url"] = await s3Storage.getTemporaryUrl(banner.photo, 245);
      }
      return banner;
    }));
    return bannersResponse;
  }
}
exports.ListBannersPublicService = ListBannersPublicService;