"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditTimelineService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditTimelineService {
  async execute({
    id,
    observation,
    renewal_id,
    name,
    date_reminder
  }) {
    if (!id || !name || !date_reminder || !renewal_id) {
      throw new Error("Preencha todos os campos");
    }
    if ((0, _dateFns.isAfter)(new Date(), new Date(date_reminder))) {
      throw new Error("Data de lembrete está no passado");
    }
    const timeline = await _prisma.default.companyTimeline.update({
      where: {
        id: id
      },
      data: {
        name: name,
        renewal_id: renewal_id,
        observation: observation,
        date_reminder: new Date(date_reminder)
      }
    });
    return timeline;
  }
}
exports.EditTimelineService = EditTimelineService;