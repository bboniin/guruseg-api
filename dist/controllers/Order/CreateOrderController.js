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
      month,
      urgent,
      sector,
      name,
      company_id
    } = req.body;
    let userId = req.userId;
    const createOrderService = new _CreateOrderService.CreateOrderService();
    const order = await createOrderService.execute({
      observation,
      items,
      userId,
      name,
      month,
      urgent,
      sector,
      company_id
    });
    return res.json(order);
  }

}

exports.CreateOrderController = CreateOrderController;