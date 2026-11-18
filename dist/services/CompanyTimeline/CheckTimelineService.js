"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckTimelineService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckTimelineService {
  async execute({
    id
  }) {
    if (!id) {
      throw new Error("Id e data de renovação é obrigatório");
    }
    const timeline = await _prisma.default.companyTimeline.update({
      where: {
        id: id
      },
      data: {
        check: true
      }
    });
    return timeline;
  }
}
exports.CheckTimelineService = CheckTimelineService;