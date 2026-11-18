"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlerCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class HandlerCompanyService {
  async execute({
    observation,
    userId,
    company_id
  }) {
    if (!observation || !userId || !company_id) {
      throw new Error("Deixa uma observação para o franqueado");
    }
    const companyGet = await _prisma.default.company.findFirst({
      where: {
        id: company_id
      }
    });
    const tecnico = await _prisma.default.collaborator.findFirst({
      where: {
        id: userId
      }
    });
    if (!tecnico) {
      throw new Error("Apenas o técnico pode solicitar alteração");
    }
    if (!companyGet) {
      throw new Error("Formulário não encontrado");
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
    if (company.order_id) {
      const order = await _prisma.default.order.findUnique({
        where: {
          id: company.order_id
        }
      });
      if (order) {
        await _prisma.default.order.update({
          where: {
            id: company.order_id
          },
          data: {
            status: "pendente",
            company_edited: true
          }
        });
      }
    }
    return company;
  }
}
exports.HandlerCompanyService = HandlerCompanyService;