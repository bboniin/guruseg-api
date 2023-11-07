"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlerCompanyService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HandlerCompanyService {
  async execute({
    observation,
    userId,
    company_id
  }) {
    if (!observation || !userId || !company_id) {
      throw new Error("Deixa uma observação para a empresa");
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

    const company = await _prisma.default.company.update({
      where: {
        id: company_id
      },
      data: {
        observation: observation,
        status: "alteracao"
      }
    });
    return company;
  }

}

exports.HandlerCompanyService = HandlerCompanyService;