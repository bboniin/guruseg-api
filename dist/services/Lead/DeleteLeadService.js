"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLeadService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteLeadService {
  async execute({
    id
  }) {
    const lead = await _prisma.default.lead.delete({
      where: {
        id: id
      },
      include: {
        leadMaster: true
      }
    });
    if (lead.leadMaster.is_user) {
      await _prisma.default.leadMaster.delete({
        where: {
          id: lead.leadMaster.id
        }
      });
    }
    return lead;
  }
}
exports.DeleteLeadService = DeleteLeadService;