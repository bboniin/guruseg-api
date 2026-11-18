"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAllRenewalService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteAllRenewalService {
  async execute() {
    const renewal = await _prisma.default.companyRenewal.deleteMany();
    return renewal;
  }
}
exports.DeleteAllRenewalService = DeleteAllRenewalService;