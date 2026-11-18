"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTimelinesService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListTimelinesService {
  async execute({
    region
  }) {
    let filter = {
      check: false
    };
    if (region) {
      filter["renewal"] = {
        region: region
      };
    }
    const timelines = await _prisma.default.companyTimeline.findMany({
      where: filter,
      orderBy: {
        date_reminder: "asc"
      },
      include: {
        renewal: true
      }
    });
    return timelines;
  }
}
exports.ListTimelinesService = ListTimelinesService;