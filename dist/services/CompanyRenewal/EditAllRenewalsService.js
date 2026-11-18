"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditAllRenewalsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditAllRenewalsService {
  async execute({
    region,
    newRegion
  }) {
    if (!newRegion || !region) {
      throw new Error("Preencha todos os campos");
    }
    const renewalRes = await _prisma.default.companyRenewal.updateMany({
      where: {
        region: region
      },
      data: {
        region: newRegion
      }
    });
    return renewalRes;
  }
}
exports.EditAllRenewalsService = EditAllRenewalsService;