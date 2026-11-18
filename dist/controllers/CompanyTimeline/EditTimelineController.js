"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditTimelineController = void 0;
var _EditTimelineService = require("../../services/CompanyTimeline/EditTimelineService");
class EditTimelineController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      date_reminder,
      observation,
      renewal_id
    } = req.body;
    const editTimelineService = new _EditTimelineService.EditTimelineService();
    const timeline = await editTimelineService.execute({
      id,
      name,
      date_reminder,
      renewal_id,
      observation
    });
    return res.json(timeline);
  }
}
exports.EditTimelineController = EditTimelineController;