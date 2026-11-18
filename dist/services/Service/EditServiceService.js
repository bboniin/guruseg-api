"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditServiceService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditServiceService {
  async execute({
    name,
    id,
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
    let data = {
      name: name,
      description: description,
      sector: sector,
      value: value,
      value_terceirize: value_terceirize,
      commission: commission,
      min_collaborators: min_collaborators,
      max_collaborators: max_collaborators,
      required_company: required_company
    };
    const service = await _prisma.default.service.update({
      where: {
        id: id
      },
      data: data
    });
    return service;
  }
}
exports.EditServiceService = EditServiceService;