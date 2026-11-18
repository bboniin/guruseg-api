"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServicesAdminService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListServicesAdminService {
  async execute({
    page,
    search,
    all
  }) {
    if (all) {
      const services = await _prisma.default.service.findMany({
        orderBy: {
          name: "asc"
        }
      });
      return services;
    }
    let filter = {};
    if (search) {
      filter["name"] = {
        contains: search,
        mode: "insensitive"
      };
    }
    const servicesTotal = await _prisma.default.service.count({
      where: {
        visible: true,
        ...filter
      }
    });
    const services = await _prisma.default.service.findMany({
      where: {
        visible: true,
        ...filter
      },
      skip: page * 30,
      take: 30,
      orderBy: {
        name: "asc"
      }
    });
    return {
      services,
      servicesTotal
    };
  }
}
exports.ListServicesAdminService = ListServicesAdminService;