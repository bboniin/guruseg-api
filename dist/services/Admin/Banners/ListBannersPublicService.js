"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListBannersPublicService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return banners;
  }

}

exports.ListBannersPublicService = ListBannersPublicService;