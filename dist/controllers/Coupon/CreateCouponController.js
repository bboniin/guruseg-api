"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCouponController = void 0;
var _CreateCouponService = require("../../services/Coupon/CreateCouponService");
class CreateCouponController {
  async handle(req, res) {
    const {
      name,
      value,
      expirationDate,
      minValue,
      type,
      isSingleUse,
      code,
      usageLimit
    } = req.body;
    const createCouponService = new _CreateCouponService.CreateCouponService();
    const coupon = await createCouponService.execute({
      name,
      value,
      expirationDate,
      minValue,
      type,
      isSingleUse,
      code,
      usageLimit
    });
    return res.json(coupon);
  }
}
exports.CreateCouponController = CreateCouponController;