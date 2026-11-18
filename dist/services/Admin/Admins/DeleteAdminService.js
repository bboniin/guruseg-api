"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAdminService = void 0;
var _prisma = _interopRequireDefault(require("../../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteAdminService {
  async execute({
    id,
    userId
  }) {
    const admin = await _prisma.default.admin.findFirst({
      where: {
        id: userId
      }
    });
    if (admin?.id != "58e368a8-f71c-40da-a5f6-bcc31a7386ad") {
      throw new Error("Rota restrita ao administrador master");
    }
    const adminDelete = await _prisma.default.admin.delete({
      where: {
        id: id
      }
    });
    return adminDelete;
  }
}
exports.DeleteAdminService = DeleteAdminService;