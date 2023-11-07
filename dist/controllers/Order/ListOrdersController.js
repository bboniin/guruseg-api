"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListOrdersController = void 0;

var _ListOrdersService = require("../../services/Order/ListOrdersService");

class ListOrdersController {
  async handle(req, res) {
    const {
      type
    } = req.params;
    const {
      month
    } = req.query;
    let userId = req.userId;
    const listOrdersService = new _ListOrdersService.ListOrdersService();
    const orders = await listOrdersService.execute({
      type,
      userId,
      month: String(month)
    });
    return res.json(orders);
  }

}

exports.ListOrdersController = ListOrdersController;