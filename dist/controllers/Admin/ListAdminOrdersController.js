"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminOrdersController = void 0;

var _ListAdminOrdersService = require("../../services/Admin/ListAdminOrdersService");

class ListAdminOrdersController {
  async handle(req, res) {
    const {
      type,
      id
    } = req.params;
    const {
      month
    } = req.query;
    const listAdminOrdersService = new _ListAdminOrdersService.ListAdminOrdersService();
    const orders = await listAdminOrdersService.execute({
      type,
      id,
      month: String(month)
    });
    return res.json(orders);
  }

}

exports.ListAdminOrdersController = ListAdminOrdersController;