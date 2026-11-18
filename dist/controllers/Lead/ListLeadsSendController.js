"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLeadsSendController = void 0;
var _ListLeadsSendService = require("../../services/Lead/ListLeadsSendService");
class ListLeadsSendController {
  async handle(req, res) {
    const {
      page,
      all,
      dateStart,
      tag,
      dateEnd
    } = req.query;
    const listLeadsSendService = new _ListLeadsSendService.ListLeadsSendService();
    const leads = await listLeadsSendService.execute({
      page: Number(page) || 0,
      all: all == "true",
      dateEnd: dateEnd ? String(dateEnd) : "",
      tag: tag ? String(tag) : "",
      dateStart: dateStart ? String(dateStart) : ""
    });
    return res.json(leads);
  }
}
exports.ListLeadsSendController = ListLeadsSendController;