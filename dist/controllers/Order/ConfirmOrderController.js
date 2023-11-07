"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmOrderController = void 0;

var _ConfirmOrderService = require("../../services/Order/ConfirmOrderService");

class ConfirmOrderController {
  async handle(req, res) {
    const {
      message
    } = req.body;
    const {
      id
    } = req.params;
    let userId = req.userId;
    const confirmOrderService = new _ConfirmOrderService.ConfirmOrderService();
    const services = await confirmOrderService.execute({
      userId,
      id: parseInt(id),
      message
    });
    return res.json(services);
  }

}

exports.ConfirmOrderController = ConfirmOrderController;