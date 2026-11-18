"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetLeadService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetLeadService {
  async execute({
    id
  }) {
    const lead = await _prisma.default.lead.findUnique({
      where: {
        id: id
      }
    });
    return lead;
  }
}
exports.GetLeadService = GetLeadService;