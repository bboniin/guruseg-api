"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAdminOrdersPeriodoController = void 0;

var _ListAdminOrdersPeriodoService = require("../../services/Admin/ListAdminOrdersPeriodoService");

class ListAdminOrdersPeriodoController {
  async handle(req, res) {
    const {
      start_date,
      end_date
    } = req.body;
    const listAdminOrdersPeriodoService = new _ListAdminOrdersPeriodoService.ListAdminOrdersPeriodoService();
    const orders = await listAdminOrdersPeriodoService.execute({
      start_date,
      end_date
    });
    return res.json(orders);
  }

}

exports.ListAdminOrdersPeriodoController = ListAdminOrdersPeriodoController;