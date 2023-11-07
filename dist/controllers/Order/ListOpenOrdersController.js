"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListOpenOrdersController = void 0;

var _ListOpenOrdersService = require("../../services/Order/ListOpenOrdersService");

class ListOpenOrdersController {
  async handle(req, res) {
    let userId = req.userId;
    const listOpenOrdersService = new _ListOpenOrdersService.ListOpenOrdersService();
    const orders = await listOpenOrdersService.execute({
      userId
    });
    return res.json(orders);
  }

}

exports.ListOpenOrdersController = ListOpenOrdersController;