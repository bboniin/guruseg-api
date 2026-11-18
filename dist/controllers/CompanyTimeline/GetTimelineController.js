"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetTimelineController = void 0;
var _GetTimelineService = require("../../services/CompanyTimeline/GetTimelineService");
class GetTimelineController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const getTimelineService = new _GetTimelineService.GetTimelineService();
    const timeline = await getTimelineService.execute({
      id
    });
    return res.json(timeline);
  }
}
exports.GetTimelineController = GetTimelineController;