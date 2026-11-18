"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminsController = void 0;
var _ListAdminsService = require("../../../services/Admin/Admins/ListAdminsService");
class ListAdminsController {
  async handle(req, res) {
    let userId = req.userId;
    const {
      filter,
      page
    } = req.query;
    const listadminsService = new _ListAdminsService.ListAdminsService();
    const admins = await listadminsService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : ""
    });
    return res.json(admins);
  }
}
exports.ListAdminsController = ListAdminsController;