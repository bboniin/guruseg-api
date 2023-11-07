"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserService = void 0;

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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