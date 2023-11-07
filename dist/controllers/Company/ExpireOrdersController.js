"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecusedOrderController = void 0;

var _RecusedOrderService = require("../../services/Order/RecusedOrderService");

class RecusedOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      message
    } = req.body;
    let userId = req.userId;
    const recusedOrderService = new _RecusedOrderService.RecusedOrderService();
    const services = await recusedOrderService.execute({
      message,
      userId,
      id: parseInt(id)
    });
    return res.json(services);
  }

}

exports.RecusedOrderController = RecusedOrderController;