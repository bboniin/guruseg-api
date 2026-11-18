"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndNegotiationContractService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EndNegotiationContractService {
  async execute({
    id,
    userId
  }) {
    const contract = await _prisma.default.contract.findFirst({
      where: {
        id: id,
        user_id: userId
      }
    });
    if (!contract) {
      throw new Error("Contrato não encontrado");
    }
    if (contract.status != "aguardando") {
      throw new Error("Contrato já assinado, expirado ou em negociação.");
    }
    const contracResusal = await _prisma.default.contract.update({
      where: {
        id: contract.id
      },
      data: {
        update_at: new Date(),
        signature_date: new Date(),
        status: "negociacao"
      }
    });
    if (contracResusal.lead_id) {
      await _prisma.default.historic.create({
        data: {
          lead_id: contracResusal.lead_id,
          name: "Proposta reenviada para o lead"
        }
      });
      await _prisma.default.lead.update({
        where: {
          id: contracResusal.lead_id
        },
        data: {
          status: "Proposta enviada",
          update_at: new Date()
        }
      });
    }
    return contracResusal;
  }
}
exports.EndNegotiationContractService = EndNegotiationContractService;