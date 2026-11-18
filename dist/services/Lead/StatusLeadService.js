"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusLeadService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class StatusLeadService {
  async execute({
    id,
    status,
    label
  }) {
    if (!status) {
      throw new Error("Status é obrigatório");
    }
    await _prisma.default.historic.create({
      data: {
        lead_id: id,
        name: label
      }
    });
    const lead = await _prisma.default.lead.update({
      where: {
        id: id
      },
      data: {
        status: status,
        update_at: new Date()
      }
    });
    return lead;
  }
}
exports.StatusLeadService = StatusLeadService;