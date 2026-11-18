"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRenewalsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListRenewalsService {
  async execute({
    region
  }) {
    const renewals = await _prisma.default.companyRenewal.findMany({
      where: {
        region: region ? region : {
          contains: region
        }
      },
      orderBy: {
        date_renewal: "asc"
      }
    });
    return renewals;
  }
}
exports.ListRenewalsService = ListRenewalsService;