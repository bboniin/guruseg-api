"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetUserService {
  async execute({
    userId
  }) {
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    return user;
  }

}

exports.GetUserService = GetUserService;