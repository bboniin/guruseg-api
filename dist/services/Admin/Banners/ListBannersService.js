"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListBannersService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListBannersService {
  async execute() {
    const banners = await _prisma.default.banner.findMany();
    const s3Storage = new _S3Storage.default();
    const bannersWithUrl = await Promise.all(banners.map(async banner => {
      if (banner.photo) {
        banner["photo_url"] = await s3Storage.getTemporaryUrl(banner.photo, 245);
      }
      return banner;
    }));
    return bannersWithUrl;
  }
}
exports.ListBannersService = ListBannersService;