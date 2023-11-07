"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetContractService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GetContractService {
  async execute({
    id
  }) {
    const contract = await _prisma.default.contract.findUnique({
      where: {
        id: id
      },
      include: {
        services: true
      }
    });

    if (!contract) {
      throw new Error("Contrato não encontrado");
    }

    return contract;
  }

}

exports.GetContractService = GetContractService;