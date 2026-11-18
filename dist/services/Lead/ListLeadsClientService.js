"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLeadsClientService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListLeadsClientService {
  async execute({
    userId
  }) {
    const leads = await _prisma.default.lead.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        update_at: "desc"
      },
      include: {
        historical: {
          orderBy: {
            create_at: "asc"
          }
        },
        leadMaster: {
          include: {
            associate: true
          }
        }
      }
    });
    return leads;
  }
}
exports.ListLeadsClientService = ListLeadsClientService;