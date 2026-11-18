"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCouponsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListCouponsService {
  async execute({
    page,
    filter
  }) {
    let filterWhere = {};
    if (filter) {
      filterWhere["name"] = {
        contains: filter,
        mode: "insensitive"
      };
      filterWhere["code"] = {
        contains: filter,
        mode: "insensitive"
      };
    }
    const couponsTotal = await _prisma.default.coupon.count({
      where: filterWhere
    });
    const coupons = await _prisma.default.coupon.findMany({
      where: filterWhere,
      orderBy: {
        create_at: "asc"
      },
      skip: page * 30,
      take: 30
    });
    return {
      coupons,
      couponsTotal
    };
  }
}
exports.ListCouponsService = ListCouponsService;