"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteEmployeService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteEmployeService {
  async execute({
    userId,
    employe_id
  }) {
    if (!userId || !employe_id) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const companyEmployeGet = await _prisma.default.companyEmployees.findFirst({
      where: {
        id: employe_id
      }
    });
    if (!companyEmployeGet) {
      throw new Error("Função já deletada não encontrado");
    }
    const companyEmploye = await _prisma.default.companyEmployees.delete({
      where: {
        id: employe_id
      }
    });
    return companyEmploye;
  }
}
exports.DeleteEmployeService = DeleteEmployeService;