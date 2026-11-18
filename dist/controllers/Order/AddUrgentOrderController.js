"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddUrgentOrderController = void 0;
var _AddUrgentOrderService = require("../../services/Order/AddUrgentOrderService");
class AddUrgentOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    const addUrgentOrderService = new _AddUrgentOrderService.AddUrgentOrderService();
    const order = await addUrgentOrderService.execute({
      userId,
      id: parseInt(id)
    });
    return res.json(order);
  }
}
exports.AddUrgentOrderController = AddUrgentOrderController;