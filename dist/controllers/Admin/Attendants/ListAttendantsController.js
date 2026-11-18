"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAttendantsController = void 0;
var _ListAttendantsService = require("../../../services/Admin/Attendants/ListAttendantsService");
class ListAttendantsController {
  async handle(req, res) {
    const {
      filter,
      page,
      all
    } = req.query;
    const listAttendantsService = new _ListAttendantsService.ListAttendantsService();
    const attendants = await listAttendantsService.execute({
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      all: all == "true"
    });
    return res.json(attendants);
  }
}
exports.ListAttendantsController = ListAttendantsController;