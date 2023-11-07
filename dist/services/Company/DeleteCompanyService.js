"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCompanyService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteCompanyService {
  async execute({
    userId,
    company_id
  }) {
    if (!userId || !company_id) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    const companyGet = await _prisma.default.company.findFirst({
      where: {
        id: company_id,
        collaborador_id: userId
      }
    });

    if (!companyGet) {
      throw new Error("Empresa não encontrada");
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