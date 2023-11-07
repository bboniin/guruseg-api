"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBannerService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditBannerService {
  async execute({
    url,
    types,
    userId,
    photo,
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
    return bannerRes;
  }

}

exports.EditBannerService = EditBannerService;