"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTimelinesController = void 0;
var _ListTimelinesService = require("../../services/CompanyTimeline/ListTimelinesService");
class ListTimelinesController {
  async handle(req, res) {
    let {
      region
    } = req.query;
    const listTimelinesService = new _ListTimelinesService.ListTimelinesService();
    const timelines = await listTimelinesService.execute({
      region: region ? String(region) : ""
    });
    return res.json(timelines);
  }
}
exports.ListTimelinesController = ListTimelinesController;