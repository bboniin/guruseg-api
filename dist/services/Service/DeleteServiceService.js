"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteServiceService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteServiceService {
  async execute({
    id
  }) {
    const service = await _prisma.default.service.update({
      where: {
        id: id
      },
      data: {
        visible: false
      }
    });
    return service;
  }
}
exports.DeleteServiceService = DeleteServiceService;