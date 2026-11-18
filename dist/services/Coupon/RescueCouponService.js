"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RescueCouponService = void 0;
var _functions = require("../../config/functions");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RescueCouponService {
  async execute({
    userId,
    coupon,
    orderId,
    value
  }) {
    if (!userId || !coupon || !orderId) {
      throw new Error("Id do usuário, cupom e OS são obrigátorios");
    }
    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }
    const redemptionOS = await _prisma.default.redemption.findFirst({
      where: {
        id: coupon["id"],
        orderId: orderId
      }
    });
    if (redemptionOS) {
      throw new Error("OS já tem cupom de desconto");
    }
    const redemption = await _prisma.default.redemption.create({
      data: {
        name: `${coupon["name"]} - ${coupon["type"] == "FIXED" ? `${(0, _functions.getValue)(coupon["value"] || 0)} OFF` : `${coupon["value"]}%`}`,
        value: value,
        couponId: coupon["id"],
        orderId: orderId,
        userId: userId
      }
    });
    return redemption;
  }
}
exports.RescueCouponService = RescueCouponService;