"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefusalContractService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RefusalContractService {
  async execute({
    id
  }) {
    const contract = await _prisma.default.contract.findUnique({
      where: {
        id: id
      }
    });
    if (contract.status != "aguardando") {
      throw new Error("Contrato já assinado ou expirado.");
    }
    const contracResusal = await _prisma.default.contract.update({
      where: {
        id: contract.id
      },
      data: {
        update_at: new Date(),
        signature_date: new Date(),
        status: "recusado"
      }
    });
    if (contracResusal.lead_id && contracResusal.is_crm) {
      await _prisma.default.historic.create({
        data: {
          lead_id: contracResusal.lead_id,
          name: "Cliente perdido"
        }
      });
      await _prisma.default.lead.update({
        where: {
          id: contracResusal.lead_id
        },
        data: {
          status: "Cliente Perdido",
          update_at: new Date()
        }
      });
    }
    return contracResusal;
  }
}
exports.RefusalContractService = RefusalContractService;