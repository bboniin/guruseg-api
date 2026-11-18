"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignatureContractService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SignatureContractService {
  async execute({
    id,
    signature
  }) {
    const contract = await _prisma.default.contract.findUnique({
      where: {
        id: id
      }
    });
    if (contract.status != "aguardando") {
      throw new Error("Contrato já assinado ou expirado.");
    }
    const contractSignature = await _prisma.default.contract.update({
      where: {
        id: contract.id
      },
      data: {
        status: "assinado",
        signature: signature,
        update_at: new Date(),
        signature_date: new Date()
      }
    });
    if (contractSignature.lead_id && contractSignature.is_crm) {
      const lead = await _prisma.default.lead.findUnique({
        where: {
          id: contractSignature.lead_id
        },
        include: {
          leadMaster: {
            include: {
              leads: true
            }
          }
        }
      });
      if (lead) {
        await _prisma.default.historic.create({
          data: {
            lead_id: contractSignature.lead_id,
            name: "Cliente fechado"
          }
        });
        await _prisma.default.lead.update({
          where: {
            id: contractSignature.lead_id
          },
          data: {
            status: "Cliente Fechado",
            update_at: new Date()
          }
        });
        await Promise.all(lead.leadMaster.leads.map(async item => {
          if (item.id != contractSignature.lead_id) {
            await _prisma.default.historic.create({
              data: {
                lead_id: item.id,
                name: "Cliente perdido"
              }
            });
            await _prisma.default.lead.update({
              where: {
                id: item.id
              },
              data: {
                status: "Cliente Perdido"
              }
            });
          }
        }));
      }
    }
    return contractSignature;
  }
}
exports.SignatureContractService = SignatureContractService;