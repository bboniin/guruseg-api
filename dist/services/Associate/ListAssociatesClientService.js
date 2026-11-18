"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAssociatesClientService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAssociatesClientService {
  async execute({
    userId
  }) {
    const user = await _prisma.default.user.findFirst({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new Error("Rota restrita para os franqueados");
    }
    const associates = await _prisma.default.associate.findMany({
      where: {
        visible: true
      },
      orderBy: {
        create_at: "desc"
      }
    });
    return {
      associates
    };
  }
}
exports.ListAssociatesClientService = ListAssociatesClientService;