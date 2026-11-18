"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEsocialAdminService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListEsocialAdminService {
  async execute({
    userId
  }) {
    let filter = {
      esocial_renewal: true,
      visible: true
    };
    if (userId) {
      filter["user_id"] = userId;
    }
    const enterprises = await _prisma.default.enterprise.findMany({
      where: filter,
      orderBy: {
        update_at: "desc"
      },
      include: {
        user: true
      }
    });
    const employees = enterprises.reduce((total, enterprise) => {
      return total + enterprise.employee_count;
    }, 0);
    return {
      enterprises,
      total: enterprises.length,
      employees: employees
    };
  }
}
exports.ListEsocialAdminService = ListEsocialAdminService;