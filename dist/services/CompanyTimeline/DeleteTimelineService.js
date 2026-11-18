"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteTimelineService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteTimelineService {
  async execute({
    id
  }) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }
    const timelineGet = await _prisma.default.companyTimeline.findFirst({
      where: {
        id: id
      }
    });
    if (!timelineGet) {
      throw new Error("Lembrete não encontrada");
    }
    const timeline = await _prisma.default.companyTimeline.delete({
      where: {
        id: id
      }
    });
    return timeline;
  }
}
exports.DeleteTimelineService = DeleteTimelineService;