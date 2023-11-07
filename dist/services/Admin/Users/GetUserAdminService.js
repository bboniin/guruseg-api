"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserAdminService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetUserAdminService {
  async execute({
    id
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        email: true,
        course: true,
        resale: true
      }
    });

    if (!user) {
      throw new Error("Franqueado não foi encontrado.");
    }

    return user;
  }

}

exports.GetUserAdminService = GetUserAdminService;