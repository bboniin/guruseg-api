"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InactiveLeadsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class InactiveLeadsService {
  async execute() {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    let leads = await _prisma.default.lead.findMany({
      where: {
        status: "Oportunidade",
        update_at: {
          lt: oneDayAgo
        },
        leadMaster: {
          is: {
            is_user: false
          }
        }
      }
    });
  }
}
exports.InactiveLeadsService = InactiveLeadsService;