"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetOrderController = void 0;
var _GetOrderService = require("../../services/Order/GetOrderService");
class GetOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const getOrderService = new _GetOrderService.GetOrderService();
    const order = await getOrderService.execute({
      userId,
      id: parseInt(id)
    });
    return res.json(order);
  }
}
exports.GetOrderController = GetOrderController;