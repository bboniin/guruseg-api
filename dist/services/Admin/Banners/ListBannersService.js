"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListBannersService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListBannersService {
  async execute({
    userId
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const banners = await _prisma.default.banner.findMany();
    return banners;
  }

}

exports.ListBannersService = ListBannersService;