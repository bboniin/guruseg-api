"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCouponService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateCouponService {
  async execute({
    code,
    type,
    name,
    value,
    isSingleUse,
    expirationDate,
    usageLimit,
    minValue
  }) {
    if (!code || !type || !value) {
      throw new Error("Preencha o código, tipo e valor do cupom de desconto");
    }
    const coupon = await _prisma.default.coupon.create({
      data: {
        code: code,
        name: name,
        value: value,
        type: type == "FIXED" ? "FIXED" : "PERCENTAGE",
        isSingleUse: isSingleUse,
        minValue: minValue || 0,
        usageLimit: usageLimit || 0,
        expirationDate: expirationDate || null
      }
    });
    return coupon;
  }
}
exports.CreateCouponService = CreateCouponService;