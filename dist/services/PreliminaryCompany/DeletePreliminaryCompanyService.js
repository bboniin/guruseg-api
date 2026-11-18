"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeletePreliminaryCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeletePreliminaryCompanyService {
  async execute({
    company_id,
    userId
  }) {
    if (!company_id) {
      throw new Error("ID do formulário não fornecido.");
    }
    const whereClause = {
      id: company_id
    };
    if (userId) {
      whereClause.collaborador_id = userId;
    }
    const companyGet = await _prisma.default.preliminaryCompany.findFirst({
      where: whereClause
    });
    if (!companyGet) {
      throw new Error("Formulário preliminar não encontrado.");
    }
    const deleted = await _prisma.default.preliminaryCompany.delete({
      where: {
        id: company_id
      }
    });
    return deleted;
  }
}
exports.DeletePreliminaryCompanyService = DeletePreliminaryCompanyService;