"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListContractsService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListContractsService {
  async execute({
    userId
  }) {
    const contracts = await _prisma.default.contract.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        update_at: "desc"
      }
    });
    return contracts;
  }

}

exports.ListContractsService = ListContractsService;