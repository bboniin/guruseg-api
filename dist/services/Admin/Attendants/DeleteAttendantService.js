"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAttendantService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteAttendantService {
  async execute({
    id
  }) {
    const attendant = await _prisma.default.attendant.update({
      where: {
        id: id
      },
      data: {
        visible: false,
        email: id
      }
    });
    return attendant;
  }
}
exports.DeleteAttendantService = DeleteAttendantService;