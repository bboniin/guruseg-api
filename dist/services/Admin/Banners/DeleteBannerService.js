"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteBannerService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteBannerService {
  async execute({
    userId,
    id
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

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