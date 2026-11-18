"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditPackageService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditPackageService {
  async execute({
    id,
    name,
    value,
    description,
    type,
    bonus
  }) {
    const depositPackage = await _prisma.default.depositPackage.findUnique({
      where: {
        id: id
      }
    });
    if (!depositPackage) {
      throw new Error("Deposito não encontrado");
    }
    if (!value || !name) {
      throw new Error("Preencha o nome e valor do pacote de deposito");
    }
    const depositPackageRes = await _prisma.default.depositPackage.update({
      where: {
        id: id
      },
      data: {
        description,
        name,
        value,
        type,
        bonus: bonus || 0
      }
    });
    return depositPackageRes;
  }
}
exports.EditPackageService = EditPackageService;