"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditCouponService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditCouponService {
  async execute({
    id,
    code,
    type,
    name,
    value,
    isSingleUse,
    expirationDate,
    usageLimit,
    active,
    minValue
  }) {
    const coupon = await _prisma.default.coupon.findUnique({
      where: {
        id: id
      }
    });
    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }
    if (!code || !type || !value) {
      throw new Error("Preencha o código, tipo e valor do cupom de desconto");
    }
    const couponRes = await _prisma.default.coupon.update({
      where: {
        id: id
      },
      data: {
        code: code,
        name: name,
        value: value,
        type: type == "FIXED" ? "FIXED" : "PERCENTAGE",
        isSingleUse: isSingleUse,
        active: active,
        minValue: minValue || 0,
        usageLimit: usageLimit || 0,
        expirationDate: expirationDate || null
      }
    });
    return couponRes;
  }
}
exports.EditCouponService = EditCouponService;