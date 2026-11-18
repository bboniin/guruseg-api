"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCouponController = void 0;
var _DeleteCouponService = require("../../services/Coupon/DeleteCouponService");
class DeleteCouponController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const deleteCouponService = new _DeleteCouponService.DeleteCouponService();
    const coupon = await deleteCouponService.execute({
      id
    });
    return res.json(coupon);
  }
}
exports.DeleteCouponController = DeleteCouponController;