"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminListContractsService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AdminListContractsService {
  async execute({
    user_id,
    userId
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const contracts = await _prisma.default.contract.findMany({
      where: {
        user_id: user_id
      },
      orderBy: {
        update_at: "desc"
      }
    });
    return contracts;
  }

}

exports.AdminListContractsService = AdminListContractsService;