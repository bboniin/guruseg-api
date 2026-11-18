"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteCompanyService {
  async execute({
    userId,
    company_id
  }) {
    if (!userId || !company_id) {
      throw new Error("Preencha todos os campos obrigatórios");
    }
    const companyGet = await _prisma.default.company.findFirst({
      where: {
        id: company_id,
        collaborador_id: userId
      }
    });
    if (!companyGet) {
      throw new Error("Formulário não encontrado");
    }
    const company = await _prisma.default.company.delete({
      where: {
        id: company_id
      }
    });
    return company;
  }
}
exports.DeleteCompanyService = DeleteCompanyService;