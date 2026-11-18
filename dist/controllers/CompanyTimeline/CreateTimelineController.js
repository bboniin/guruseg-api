"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTimelineController = void 0;
var _CreateTimelineService = require("../../services/CompanyTimeline/CreateTimelineService");
class CreateTimelineController {
  async handle(req, res) {
    const {
      name,
      renewal_id,
      date_reminder,
      observation
    } = req.body;
    const createTimelineService = new _CreateTimelineService.CreateTimelineService();
    const timeline = await createTimelineService.execute({
      name,
      renewal_id,
      date_reminder,
      observation
    });
    return res.json(timeline);
  }
}
exports.CreateTimelineController = CreateTimelineController;