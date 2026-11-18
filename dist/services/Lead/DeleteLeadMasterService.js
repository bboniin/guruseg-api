"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteLeadMasterService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteLeadMasterService {
  async execute({
    id
  }) {
    const lead = await _prisma.default.leadMaster.delete({
      where: {
        id: id
      }
    });
    return lead;
  }
}
exports.DeleteLeadMasterService = DeleteLeadMasterService;