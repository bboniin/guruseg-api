"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCouponsController = void 0;
var _ListCouponsService = require("../../services/Coupon/ListCouponsService");
class ListCouponsController {
  async handle(req, res) {
    const {
      page,
      filter
    } = req.query;
    const listCouponsService = new _ListCouponsService.ListCouponsService();
    const coupons = await listCouponsService.execute({
      filter: filter ? String(filter) : "",
      page: Number(page) || 0
    });
    return res.json(coupons);
  }
}
exports.ListCouponsController = ListCouponsController;