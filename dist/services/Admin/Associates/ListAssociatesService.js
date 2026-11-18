"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAssociatesService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAssociatesService {
  async execute({
    page,
    filter,
    all
  }) {
    let filterSearch = {};
    if (all) {
      const associates = await _prisma.default.associate.findMany({
        where: {
          visible: true
        },
        orderBy: {
          create_at: "asc"
        }
      });
      return {
        associates
      };
    }
    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive"
      };
    }
    const associatesTotal = await _prisma.default.associate.count({
      where: {
        visible: true,
        ...filterSearch
      }
    });
    const associates = await _prisma.default.associate.findMany({
      where: {
        visible: true,
        ...filterSearch
      },
      orderBy: {
        create_at: "asc"
      },
      skip: page * 30,
      take: 30
    });
    const s3Storage = new _S3Storage.default();
    const associatesResponse = await Promise.all(associates.map(async associate => {
      if (associate.photo) {
        associate["photo_url"] = await s3Storage.getTemporaryUrl(associate.photo, 245);
      }
      return associate;
    }));
    return {
      associates: associatesResponse,
      associatesTotal
    };
  }
}
exports.ListAssociatesService = ListAssociatesService;