"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecusedDocOrderController = void 0;
var _RecusedDocOrderService = require("../../services/Order/RecusedDocOrderService");
class RecusedDocOrderController {
  async handle(req, res) {
    const {
      order_id
    } = req.params;
    const {
      observation
    } = req.body;
    let userId = req.userId;
    const recusedDocOrderService = new _RecusedDocOrderService.RecusedDocOrderService();
    const order = await recusedDocOrderService.execute({
      order_id: Number(order_id),
      observation,
      userId
    });
    return res.json(order);
  }
}
exports.RecusedDocOrderController = RecusedDocOrderController;