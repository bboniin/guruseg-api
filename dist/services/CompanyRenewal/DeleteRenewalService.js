"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRenewalService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteRenewalService {
  async execute({
    id
  }) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }
    const renewalGet = await _prisma.default.companyRenewal.findFirst({
      where: {
        id: id
      }
    });
    if (!renewalGet) {
      throw new Error("Empresa não encontrada");
    }
    const renewal = await _prisma.default.companyRenewal.delete({
      where: {
        id: id
      }
    });
    return renewal;
  }
}
exports.DeleteRenewalService = DeleteRenewalService;