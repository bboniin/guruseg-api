"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEnterpriseService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListEnterpriseService {
  async execute({
    userId,
    search,
    type,
    page,
    all
  }) {
    let filter = {
      user_id: userId,
      visible: true
    };
    if (type) {
      filter.type = type;
    }
    if (search) {
      filter.OR = [{
        razao_social: {
          contains: search,
          mode: "insensitive"
        }
      }, {
        nome_fantasia: {
          contains: search,
          mode: "insensitive"
        }
      }, {
        document: {
          contains: search,
          mode: "insensitive"
        }
      }];
    }
    const pageNumber = page !== undefined ? Number(page) : undefined;
    const take = 30;
    const skip = !all && pageNumber !== undefined ? pageNumber * take : undefined;
    const enterprises = await _prisma.default.enterprise.findMany({
      where: filter,
      orderBy: {
        update_at: "desc"
      },
      ...(!all && skip !== undefined && {
        skip
      }),
      ...(!all && pageNumber !== undefined && {
        take
      })
    });
    const total = await _prisma.default.enterprise.count({
      where: filter
    });
    return {
      enterprises,
      total
    };
  }
}
exports.ListEnterpriseService = ListEnterpriseService;