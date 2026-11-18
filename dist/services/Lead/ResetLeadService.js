"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetLeadService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ResetLeadService {
  async execute({
    id
  }) {
    const leadGet = await _prisma.default.lead.findUnique({
      where: {
        id: id
      }
    });
    if (!leadGet) {
      throw new Error("Lead não encontrado");
    }
    const lead = await _prisma.default.lead.update({
      where: {
        id: id
      },
      data: {
        status: "Abordagem",
        contract_id: "",
        update_at: new Date()
      }
    });
    await _prisma.default.historic.create({
      data: {
        lead_id: id,
        name: "Resetado"
      }
    });
    await _prisma.default.contract.updateMany({
      where: {
        lead_id: id
      },
      data: {
        lead_id: null
      }
    });
    return lead;
  }
}
exports.ResetLeadService = ResetLeadService;