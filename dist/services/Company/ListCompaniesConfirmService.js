"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompaniesConfirmService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListCompaniesConfirmService {
  async execute({
    userId,
    order_id
  }) {
    const companies = await _prisma.default.company.findMany({
      where: {
        collaborador_id: userId,
        status: "confirmado",
        OR: [{
          order_id: order_id
        }, {
          order_id: 0
        }]
      },
      orderBy: {
        update_at: "desc"
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc"
          }
        }
      }
    });
    return companies;
  }
}
exports.ListCompaniesConfirmService = ListCompaniesConfirmService;