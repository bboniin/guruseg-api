"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePreliminaryCompanyService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreatePreliminaryCompanyService {
  async execute({
    razao_social,
    observation,
    userId
  }) {
    if (!razao_social) {
      throw new Error("Preencha a razão social da empresa.");
    }
    const preliminaryCompany = await _prisma.default.preliminaryCompany.create({
      data: {
        razao_social,
        observation: observation || "",
        collaborador_id: userId || "",
        status: "aguardando",
        functions: {
          create: [{
            name: "",
            cbo: "",
            quantidade_colaboradores: 1,
            quantidade_colaboradores_m: 1,
            quantidade_colaboradores_f: 0,
            description: "",
            epis: ""
          }]
        }
      },
      include: {
        functions: true
      }
    });
    return preliminaryCompany;
  }
}
exports.CreatePreliminaryCompanyService = CreatePreliminaryCompanyService;