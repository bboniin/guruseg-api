"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLeadService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditLeadService {
  async execute({
    id,
    name,
    value,
    observation,
    email,
    location,
    cnpj,
    necessity,
    phone_number,
    employees
  }) {
    if (!name || !email || !phone_number) {
      throw new Error("Nome, email e telefone são obrigatórios");
    }
    const lead = await _prisma.default.lead.update({
      where: {
        id: id
      },
      data: {
        name: name,
        email: email,
        phone_number: phone_number,
        observation: observation,
        employees: employees,
        necessity: necessity,
        cnpj: cnpj,
        value: value || 0,
        location: location,
        update_at: new Date()
      }
    });
    return lead;
  }
}
exports.EditLeadService = EditLeadService;