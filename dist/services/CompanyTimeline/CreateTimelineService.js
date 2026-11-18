"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTimelineService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _dateFns = require("date-fns");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateTimelineService {
  async execute({
    name,
    observation,
    date_reminder,
    renewal_id
  }) {
    if (!date_reminder || !name || !renewal_id) {
      throw new Error("Preencha todos os campos");
    }
    if ((0, _dateFns.isAfter)(new Date(), new Date(date_reminder))) {
      throw new Error("Nova data de renovação está no passado");
    }
    const timeline = await _prisma.default.companyTimeline.create({
      data: {
        name: name,
        date_reminder: new Date(date_reminder),
        renewal_id: renewal_id,
        observation: observation,
        check: false
      }
    });
    return timeline;
  }
}
exports.CreateTimelineService = CreateTimelineService;