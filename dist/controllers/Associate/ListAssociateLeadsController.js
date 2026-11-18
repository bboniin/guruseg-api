"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAssociateLeadsController = void 0;
var _ListAssociateLeadsService = require("../../services/Associate/ListAssociateLeadsService");
class ListAssociateLeadsController {
  async handle(req, res) {
    const {
      page,
      dateStart,
      dateEnd,
      status,
      search
    } = req.query;
    const associate_id = req.userId;
    const listAssociateLeadsService = new _ListAssociateLeadsService.ListAssociateLeadsService();
    const leads = await listAssociateLeadsService.execute({
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
exports.ListAssociateLeadsController = ListAssociateLeadsController;