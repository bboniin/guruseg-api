"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetLeadMasterService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetLeadMasterService {
  async execute({
    id
  }) {
    const lead = await _prisma.default.lead.findFirst({
      where: {
        lead_id: id
      }
    });
    return lead;
  }
}
exports.GetLeadMasterService = GetLeadMasterService;