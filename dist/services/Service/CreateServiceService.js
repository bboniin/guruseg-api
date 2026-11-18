"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateServiceService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateServiceService {
  async execute({
    name,
    description,
    value,
    value_terceirize,
    min_collaborators,
    max_collaborators,
    commission,
    sector,
    required_company
  }) {
    if (!name || !value && !value_terceirize || !commission || !sector) {
      throw new Error("Nome, valor, setor e comissão é obrigatório");
    }
    const service = await _prisma.default.service.create({
      data: {
        name: name,
        value: Number(value),
        value_terceirize: Number(value_terceirize),
        commission: Number(commission),
        visible: true,
        description: description,
        sector: sector,
        min_collaborators: min_collaborators,
        max_collaborators: max_collaborators,
        required_company: required_company
      }
    });
    return service;
  }
}
exports.CreateServiceService = CreateServiceService;