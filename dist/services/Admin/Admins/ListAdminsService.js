"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminsService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAdminsService {
  async execute({
    userId,
    page,
    filter
  }) {
    const admin = await _prisma.default.admin.findFirst({
      where: {
        id: userId
      }
    });
    if (admin?.id != "58e368a8-f71c-40da-a5f6-bcc31a7386ad") {
      throw new Error("Rota restrita ao administrador master");
    }
    let filterSearch = {};
    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive"
      };
    }
    const adminsTotal = await _prisma.default.admin.count({
      where: {
        ...filterSearch
      }
    });
    const admins = await _prisma.default.admin.findMany({
      where: {
        ...filterSearch
      },
      orderBy: {
        create_at: "asc"
      },
      skip: page * 30,
      take: 30
    });
    const s3Storage = new _S3Storage.default();
    const adminsResponse = await Promise.all(admins.map(async banner => {
      if (banner.photo) {
        banner["photo_url"] = await s3Storage.getTemporaryUrl(banner.photo, 245);
      }
      return adminsResponse;
    }));
    return {
      admins: admins,
      adminsTotal
    };
  }
}
exports.ListAdminsService = ListAdminsService;