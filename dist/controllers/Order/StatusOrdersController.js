"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusOrderController = void 0;

var _StatusOrderService = require("../../services/Order/StatusOrderService");

class StatusOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      message,
      status
    } = req.body;
    let userId = req.userId;
    const statusOrderService = new _StatusOrderService.StatusOrderService();
    const services = await statusOrderService.execute({
      userId,
      id: parseInt(id),
      message,
      status
    });
    return res.json(services);
  }

}

exports.StatusOrderController = StatusOrderController;