"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptOrderController = void 0;

var _AcceptOrderService = require("../../services/Order/AcceptOrderService");

class AcceptOrderController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      message
    } = req.body;
    let userId = req.userId;
    const acceptOrderService = new _AcceptOrderService.AcceptOrderService();
    const services = await acceptOrderService.execute({
      message,
      userId,
      id: parseInt(id)
    });
    return res.json(services);
  }

}

exports.AcceptOrderController = AcceptOrderController;