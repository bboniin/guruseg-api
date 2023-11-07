"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CancelOrderController = void 0;

var _CancelOrderService = require("../../services/Order/CancelOrderService");

class CancelOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const cancelOrderService = new _CancelOrderService.CancelOrderService();
    const order = await cancelOrderService.execute({
      id: parseInt(id)
    });
    return res.json(order);
  }

}

exports.CancelOrderController = CancelOrderController;