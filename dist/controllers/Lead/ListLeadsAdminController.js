"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLeadsAdminController = void 0;
var _ListLeadsAdminService = require("../../services/Lead/ListLeadsAdminService");
class ListLeadsAdminController {
  async handle(req, res) {
    const {
      page,
      dateStart,
      dateEnd,
      userId,
      status
    } = req.query;
    const listLeadsAdminService = new _ListLeadsAdminService.ListLeadsAdminService();
    const leads = await listLeadsAdminService.execute({
      page: Number(page) || 0,
      userId: userId ? String(userId) : "",
      status: status ? String(status) : "",
      dateEnd: dateEnd ? String(dateEnd) : "",
      dateStart: dateStart ? String(dateStart) : ""
    });
    return res.json(leads);
  }
}
exports.ListLeadsAdminController = ListLeadsAdminController;