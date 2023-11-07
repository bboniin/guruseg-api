"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListServicesService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListServicesService {
  async execute({
    userId
  }) {
    const services = await _prisma.default.service.findMany({
      where: {
        visible: true
      },
      orderBy: {
        create_at: "asc"
      }
    });
    return services;
  }

}

exports.ListServicesService = ListServicesService;