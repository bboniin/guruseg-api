"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePackageService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreatePackageService {
  async execute({
    description,
    type,
    name,
    value,
    bonus
  }) {
    if (!name || !value) {
      throw new Error("Preencha o nome e valor do pacote de deposito");
    }
    const deposit = await _prisma.default.depositPackage.create({
      data: {
        description,
        name,
        value,
        type,
        bonus: bonus || 0
      }
    });
    return deposit;
  }
}
exports.CreatePackageService = CreatePackageService;