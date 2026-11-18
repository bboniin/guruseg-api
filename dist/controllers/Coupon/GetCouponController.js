"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCouponController = void 0;
var _GetCouponService = require("../../services/Coupon/GetCouponService");
class GetCouponController {
  async handle(req, res) {
    const {
      code,
      value
    } = req.body;
    let userId = req.userId;
    const getCouponService = new _GetCouponService.GetCouponService();
    const coupon = await getCouponService.execute({
      userId,
      value,
      code
    });
    return res.json(coupon);
  }
}
exports.GetCouponController = GetCouponController;