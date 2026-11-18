"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCouponController = void 0;
var _EditCouponService = require("../../services/Coupon/EditCouponService");
class EditCouponController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      value,
      expirationDate,
      minValue,
      type,
      isSingleUse,
      code,
      usageLimit,
      active
    } = req.body;
    const editCouponService = new _EditCouponService.EditCouponService();
    const coupon = await editCouponService.execute({
      name,
      value,
      expirationDate,
      minValue,
      type,
      isSingleUse,
      code,
      usageLimit,
      active,
      id
    });
    return res.json(coupon);
  }
}
exports.EditCouponController = EditCouponController;