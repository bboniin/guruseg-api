"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadMasterService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateLeadMasterService {
  async execute({
    name,
    observation,
    email,
    location,
    cnpj,
    necessity,
    phone_number,
    price,
    employees,
    value,
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
        throw new Error("Email já está em uso");
      }
    }
    let user_id = "";
    if (associate_id) {
      const associate = await _prisma.default.associate.findUnique({
        where: {
          id: associate_id
        }
      });
      user_id = associate.user_id;
    }
    const lead = await _prisma.default.leadMaster.create({
      data: {
        name: name,
        email: email,
        phone_number: phone_number,
        observation: observation,
        employees: employees,
        necessity: necessity,
        cnpj: cnpj,
        value: value || 0,
        price: price || 0,
        location: location,
        tag: associate_id ? "Associado" : "Cadastrado",
        associate_id: associate_id
      }
    });
    if (user_id) {
      await _prisma.default.lead.create({
        data: {
          name: name,
          email: email,
          phone_number: phone_number,
          observation: observation,
          employees: employees,
          necessity: necessity,
          cnpj: cnpj,
          value: value || 0,
          price: price || 0,
          location: location,
          tag: associate_id ? "Associado" : "Cadastrado",
          lead_id: lead.id,
          user_id: user_id
        }
      });
    }
    return lead;
  }
}
exports.CreateLeadMasterService = CreateLeadMasterService;