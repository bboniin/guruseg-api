"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCouponService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
var _functions = require("../../config/functions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetCouponService {
  async execute({
    userId,
    code,
    value
  }) {
    const coupon = await _prisma.default.coupon.findFirst({
      where: {
        code: {
          equals: code,
          mode: "insensitive"
        },
        active: true
      },
      include: {
        redemptions: true
      }
    });
    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }
    if (coupon.expirationDate) {
      if ((0, _dateFns.isBefore)((0, _dateFns.endOfDay)(coupon.expirationDate), (0, _dateFns.endOfDay)(new Date()))) {
        throw new Error("Cupom de desconto expirado");
      }
    }
    if (coupon.isSingleUse) {
      const redemption = await _prisma.default.redemption.findFirst({
        where: {
          couponId: coupon.id,
          userId: userId
        }
      });
      if (redemption) {
        throw new Error("Cupom de desconto já foi utilizado");
      }
    }
    if (!!coupon.usageLimit && coupon.usageLimit <= coupon.redemptions.length) {
      throw new Error("Cupom de desconto esgotado");
    }
    if (value < coupon.minValue) {
      throw new Error(`Valor mínimo para resgatar esse cupom é de ${(0, _functions.getValue)(coupon.minValue)}`);
    }
    return coupon;
  }
}
exports.GetCouponService = GetCouponService;