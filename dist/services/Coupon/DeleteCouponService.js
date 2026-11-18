"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCouponService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteCouponService {
  async execute({
    id
  }) {
    const coupon = await _prisma.default.coupon.findUnique({
      where: {
        id: id
      },
      include: {
        redemptions: true
      }
    });
    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }
    const couponDel = await _prisma.default.coupon.delete({
      where: {
        id: id
      }
    });
    return couponDel;
  }
}
exports.DeleteCouponService = DeleteCouponService;