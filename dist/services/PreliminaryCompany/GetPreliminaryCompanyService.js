"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPreliminaryCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetPreliminaryCompanyService {
  async execute({
    company_id
  }) {
    if (!company_id) {
      throw new Error("ID do formulário não fornecido.");
    }
    const preliminaryCompany = await _prisma.default.preliminaryCompany.findUnique({
      where: {
        id: company_id
      },
      include: {
        functions: {
          orderBy: {
            create_at: "asc"
          }
        }
      }
    });
    if (!preliminaryCompany) {
      throw new Error("Formulário preliminar não encontrado.");
    }
    return preliminaryCompany;
  }
}
exports.GetPreliminaryCompanyService = GetPreliminaryCompanyService;