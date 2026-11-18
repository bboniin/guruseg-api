"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckTimelineController = void 0;
var _CheckTimelineService = require("../../services/CompanyTimeline/CheckTimelineService");
class CheckTimelineController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const checkTimelineService = new _CheckTimelineService.CheckTimelineService();
    const timeline = await checkTimelineService.execute({
      id
    });
    return res.json(timeline);
  }
}
exports.CheckTimelineController = CheckTimelineController;