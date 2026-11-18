"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminAssociateLeadsController = void 0;
var _ListAdminAssociateLeadsService = require("../../../services/Admin/Associates/ListAdminAssociateLeadsService");
class ListAdminAssociateLeadsController {
  async handle(req, res) {
    const {
      page,
      dateStart,
      dateEnd,
      status,
      search
    } = req.query;
    const {
      associate_id
    } = req.params;
    const listAdminAssociateLeadsService = new _ListAdminAssociateLeadsService.ListAdminAssociateLeadsService();
    const leads = await listAdminAssociateLeadsService.execute({
      associate_id,
      page: Number(page) || 0,
      dateStart: dateStart,
      dateEnd: dateEnd,
      status: status,
      search: search
    });
    return res.json(leads);
  }
}
exports.ListAdminAssociateLeadsController = ListAdminAssociateLeadsController;