"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEsocialService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListEsocialService {
  async execute({
    userId
  }) {
    const enterprises = await _prisma.default.enterprise.findMany({
      where: {
        user_id: userId,
        esocial_renewal: true,
        visible: true
      },
      orderBy: {
        update_at: "desc"
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
exports.ListEsocialService = ListEsocialService;