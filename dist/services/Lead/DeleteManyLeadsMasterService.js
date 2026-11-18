"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteManyLeadsMasterService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteManyLeadsMasterService {
  async execute() {
    const lead = await _prisma.default.leadMaster.deleteMany({
      where: {
        leads: {
          none: {}
        }
      }
    });
    return lead;
  }
}
exports.DeleteManyLeadsMasterService = DeleteManyLeadsMasterService;