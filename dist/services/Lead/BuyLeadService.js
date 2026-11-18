"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuyLeadService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BuyLeadService {
  async execute({
    lead_id,
    userId
  }) {
    if (!userId || !lead_id) {
      throw new Error("Id do Franqueado e Id do lead são obrigatórios");
    }
    const user = await _prisma.default.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new Error("Franqueado não foi encontrado");
    }
    const leadMaster = await _prisma.default.leadMaster.findUnique({
      where: {
        id: lead_id
      }
    });
    if (!leadMaster) {
      throw new Error("Lead não está mais disponível para compra");
    }
    if (leadMaster.price > user.balance_leads) {
      throw new Error("Saldo insuficiente para comprar o Lead, efetue um deposito para continuar");
    }
    await _prisma.default.user.update({
      where: {
        id: userId
      },
      data: {
        balance_leads: parseFloat((user.balance_leads - leadMaster.price).toFixed(2))
      }
    });
    const lead = _prisma.default.lead.create({
      data: {
        name: leadMaster.name,
        value: leadMaster.value,
        price: leadMaster.price,
        tag: leadMaster.tag,
        necessity: leadMaster.necessity,
        phone_number: leadMaster.phone_number,
        email: leadMaster.email,
        cnpj: leadMaster.cnpj,
        employees: leadMaster.employees,
        location: leadMaster.location,
        user_id: userId,
        lead_id: leadMaster.id,
        observation: leadMaster.observation
      }
    });
    await _prisma.default.payment.create({
      data: {
        value: leadMaster.price,
        lead_id: leadMaster.id,
        status: "confirmado",
        method: "SALDO",
        type: "LEAD",
        user_id: userId
      }
    });
    return lead;
  }
}
exports.BuyLeadService = BuyLeadService;