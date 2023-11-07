"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignatureContractService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return contractSignature;
  }

}

exports.SignatureContractService = SignatureContractService;