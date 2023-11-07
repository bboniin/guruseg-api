"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListUsersService {
  async execute({
    userId
  }) {
    const services = await _prisma.default.user.findMany({
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

exports.ListUsersService = ListUsersService;