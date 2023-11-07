"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefusalContractService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return contracResusal;
  }

}

exports.RefusalContractService = RefusalContractService;