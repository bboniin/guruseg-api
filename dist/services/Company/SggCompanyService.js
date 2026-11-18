"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SggCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SggCompanyService {
  async execute({
    company_id,
    sgg_id
  }) {
    if (!sgg_id) {
      throw new Error("Código SGG é obrigatorio");
    }
    const companyGet = await _prisma.default.company.findFirst({
      where: {
        id: company_id
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc"
          },
          include: {
            companyEmployees: {
              orderBy: {
                create_at: "asc"
              }
            },
            companyScratchs: {
              orderBy: {
                create_at: "asc"
              }
            }
          }
        }
      }
    });
    if (!companyGet) {
      throw new Error("Formulário não encontrada");
    }
    const company = await _prisma.default.company.update({
      where: {
        id: company_id
      },
      data: {
        sgg_id: sgg_id
      }
    });
    return company;
  }
}
exports.SggCompanyService = SggCompanyService;