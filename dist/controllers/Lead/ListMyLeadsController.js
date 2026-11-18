"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListMyLeadsController = void 0;
var _ListMyLeadsService = require("../../services/Lead/ListMyLeadsService");
class ListMyLeadsController {
  async handle(req, res) {
    const {
      page,
      dateStart,
      dateEnd,
      all,
      status
    } = req.query;
    const userId = req.userId;
    const listMyLeadsService = new _ListMyLeadsService.ListMyLeadsService();
    const leads = await listMyLeadsService.execute({
      page: Number(page) || 0,
      userId: userId,
      all: all == "true",
      dateEnd: dateEnd ? String(dateEnd) : "",
      dateStart: dateStart ? String(dateStart) : "",
      status: status ? String(status) : ""
    });
    return res.json(leads);
  }
}
exports.ListMyLeadsController = ListMyLeadsController;