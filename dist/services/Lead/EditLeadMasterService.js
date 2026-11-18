"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLeadMasterService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditLeadMasterService {
  async execute({
    id,
    name,
    value,
    price,
    observation,
    email,
    location,
    cnpj,
    necessity,
    phone_number,
    employees,
    associate_id
  }) {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }
    if (email) {
      const leadMaster = await _prisma.default.leadMaster.findFirst({
        where: {
          email: email
        }
      });
      if (leadMaster) {
        if (leadMaster.id != id) {
          throw new Error("Email já está em uso");
        }
      }
    }
    const lead = await _prisma.default.leadMaster.update({
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
        location: location,
        price: price || 0,
        associate_id: associate_id,
        value: value || 0,
        update_at: new Date()
      }
    });
    return lead;
  }
}
exports.EditLeadMasterService = EditLeadMasterService;