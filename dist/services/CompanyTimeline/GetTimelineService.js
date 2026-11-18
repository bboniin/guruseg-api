"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetTimelineService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetTimelineService {
  async execute({
    id
  }) {
    if (!id) {
      throw new Error("Id é obrigatório");
    }
    const timeline = await _prisma.default.companyTimeline.findUnique({
      where: {
        id: id
      },
      include: {
        renewal: true
      }
    });
    if (!timeline) {
      throw new Error("Lembrete não encontrada");
    }
    return timeline;
  }
}
exports.GetTimelineService = GetTimelineService;