"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlerOrderController = void 0;

var _HandlerOrderService = require("../../services/Order/HandlerOrderService");

class HandlerOrderController {
  async handle(req, res) {
    const {
      message,
      items,
      order_id
    } = req.body;
    let userId = req.userId;
    const handlerOrderService = new _HandlerOrderService.HandlerOrderService();
    const order = await handlerOrderService.execute({
      message,
      items,
      order_id,
      userId
    });
    return res.json(order);
  }

}

exports.HandlerOrderController = HandlerOrderController;