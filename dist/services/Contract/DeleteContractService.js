"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteContractService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteContractService {
  async execute({
    id
  }) {
    const contract = await _prisma.default.contract.findUnique({
      where: {
        id: id
      }
    });
    if (contract["status"] == "assinado") {
      throw new Error("Contrato assinado não pode ser deletado");
    }
    await _prisma.default.contract.delete({
      where: {
        id: id
      }
    });
    return contract;
  }
}
exports.DeleteContractService = DeleteContractService;