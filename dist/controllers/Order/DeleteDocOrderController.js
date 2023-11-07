"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteDocOrderController = void 0;

var _DeleteDocOrderService = require("../../services/Order/DeleteDocOrderService");

class DeleteDocOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      type
    } = req.query;
    const deleteDocOrderService = new _DeleteDocOrderService.DeleteDocOrderService();
    const order = await deleteDocOrderService.execute({
      id,
      type: String(type)
    });
    return res.json(order);
  }

}

exports.DeleteDocOrderController = DeleteDocOrderController;