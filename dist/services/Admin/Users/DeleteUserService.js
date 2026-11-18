"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteUserService {
  async execute({
    id
  }) {
    const service = await _prisma.default.user.update({
      where: {
        id: id
      },
      data: {
        visible: false,
        email: id
      }
    });
    return service;
  }
}
exports.DeleteUserService = DeleteUserService;