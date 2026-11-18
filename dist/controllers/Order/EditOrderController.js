"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditOrderController = void 0;
var _EditOrderService = require("../../services/Order/EditOrderService");
class EditOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      observation,
      company_id
    } = req.body;
    let userId = req.userId;
    const editOrderService = new _EditOrderService.EditOrderService();
    const order = await editOrderService.execute({
      observation,
      company_id,
      userId,
      id: parseInt(id)
    });
    return res.json(order);
  }
}
exports.EditOrderController = EditOrderController;