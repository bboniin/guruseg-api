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

    if (order["user"].photo) {
      order["user"]["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + order["user"].photo;
    }

    if (order["collaborator"]) {
      if (order["collaborator"].photo) {
        order["collaborator"]["photo_url"] = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + order["collaborator"].photo;
      }
    }

    return res.json(order);
  }

}

exports.GetOrderController = GetOrderController;