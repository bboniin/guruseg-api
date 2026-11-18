"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEnterpriseAdminService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListEnterpriseAdminService {
  async execute({
    user_id,
    search,
    type,
    page,
    all
  }) {
    let filter = {
      visible: true
    };
    if (user_id) {
      filter.user_id = user_id;
    }
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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true
          }
        },
        orders: true
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
exports.ListEnterpriseAdminService = ListEnterpriseAdminService;