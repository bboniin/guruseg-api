"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteTimelineController = void 0;
var _DeleteTimelineService = require("../../services/CompanyTimeline/DeleteTimelineService");
class DeleteTimelineController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteTimelineService = new _DeleteTimelineService.DeleteTimelineService();
    const timeline = await deleteTimelineService.execute({
      id
    });
    return res.json(timeline);
  }
}
exports.DeleteTimelineController = DeleteTimelineController;