"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAttendantsService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAttendantsService {
  async execute({
    page,
    filter,
    all
  }) {
    let filterSearch = {};
    if (all) {
      const attendants = await _prisma.default.attendant.findMany({
        where: {
          visible: true
        },
        orderBy: {
          create_at: "asc"
        }
      });
      return {
        attendants
      };
    }
    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive"
      };
    }
    const attendantsTotal = await _prisma.default.attendant.count({
      where: {
        visible: true,
        ...filterSearch
      }
    });
    const attendants = await _prisma.default.attendant.findMany({
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
    const attendantsResponse = await Promise.all(attendants.map(async attendant => {
      if (attendant.photo) {
        attendant["photo_url"] = await s3Storage.getTemporaryUrl(attendant.photo, 245);
      }
      return attendant;
    }));
    return {
      attendants: attendantsResponse,
      attendantsTotal
    };
  }
}
exports.ListAttendantsService = ListAttendantsService;