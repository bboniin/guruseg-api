"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendLeadService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SendLeadService {
  async execute({
    leads,
    userId
  }) {
    if (!userId || !leads.length) {
      throw new Error("Id do Franqueado e pelo menos um lead são obrigatórios");
    }
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new Error("Franqueado não foi encontrado");
    }
    await Promise.all(leads.map(async item => {
      const leadMaster = await _prisma.default.leadMaster.findUnique({
        where: {
          id: item
        }
      });
      if (leadMaster) {
        return _prisma.default.lead.create({
          data: {
            name: leadMaster.name,
            value: leadMaster.value,
            tag: leadMaster.tag,
            necessity: leadMaster.necessity,
            phone_number: leadMaster.phone_number,
            email: leadMaster.email,
            cnpj: leadMaster.cnpj,
            employees: leadMaster.employees,
            location: leadMaster.location,
            user_id: userId,
            lead_id: leadMaster.id,
            price: 0,
            observation: leadMaster.observation
          }
        });
      }
    }));
    return "Leads enviado com sucesso";
  }
}
exports.SendLeadService = SendLeadService;