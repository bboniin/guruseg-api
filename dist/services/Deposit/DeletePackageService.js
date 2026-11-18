"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeletePackageService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeletePackageService {
  async execute({
    id
  }) {
    const depositPackage = await _prisma.default.depositPackage.findFirst({
      where: {
        id: id
      }
    });
    if (!depositPackage) {
      throw new Error("Pacode de deposito não encontrado");
    }
    const depositPackageDel = await _prisma.default.depositPackage.delete({
      where: {
        id: id
      }
    });
    return depositPackageDel;
  }
}
exports.DeletePackageService = DeletePackageService;