"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrderController = void 0;
var _CreateOrderService = require("../../services/Order/CreateOrderService");
class CreateOrderController {
  async handle(req, res) {
    const {
      observation,
      items,
      sector,
      name,
      code,
      collaborators,
      company_id,
      enterprise_id,
      reminder,
      type,
      delivery_time,
      acquisition_channel
    } = req.body;
    let userId = req.userId;
    const createOrderService = new _CreateOrderService.CreateOrderService();
    const order = await createOrderService.execute({
      observation,
      items,
      userId,
      name,
      sector,
      company_id,
      enterprise_id,
      collaborators,
      code,
      reminder,
      type,
      delivery_time: delivery_time ? Number(delivery_time) : 5,
      acquisition_channel
    });
    return res.json(order);
  }
}
exports.CreateOrderController = CreateOrderController;