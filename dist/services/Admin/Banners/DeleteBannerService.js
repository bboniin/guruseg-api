"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteBannerService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteBannerService {
  async execute({
    id
  }) {
    const banner = await _prisma.default.banner.findUnique({
      where: {
        id: id
      }
    });
    if (banner["photo"]) {
      const s3Storage = new _S3Storage.default();
      await s3Storage.deleteFile(banner["photo"]);
    }
    const banners = await _prisma.default.banner.delete({
      where: {
        id: id
      }
    });
    return banners;
  }
}
exports.DeleteBannerService = DeleteBannerService;