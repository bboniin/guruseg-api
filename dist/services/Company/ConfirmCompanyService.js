"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ConfirmCompanyService {
  async execute({
    company_id
  }) {
    const companyGet = await _prisma.default.company.findUnique({
      where: {
        id: company_id
      }
    });
    if (!companyGet) {
      throw new Error("Formulário não encontrado");
    }
    if (companyGet.status == "confirmado") {
      throw new Error("Formulário já confirmado");
    }
    const company = await _prisma.default.company.update({
      where: {
        id: company_id
      },
      data: {
        status: "confirmado"
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
            status: order.is_finished ? "alteracao" : "andamento",
            company_edited: false
          }
        });
      }
    }
    return company;
  }
}
exports.ConfirmCompanyService = ConfirmCompanyService;