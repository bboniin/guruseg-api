"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpireContractsService = void 0;

var _dateFns = require("date-fns");

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExpireContractsService {
  async execute() {
    const contracts = await _prisma.default.contract.findMany({
      where: {
        status: "aguardando"
      }
    });
    contracts.map(async item => {
      if ((0, _dateFns.differenceInDays)(item.create_at, new Date()) <= -59) {
        await _prisma.default.contract.update({
          where: {
            id: item.id
          },
          data: {
            status: "expirado",
            update_at: new Date()
          }
        });
      }
    });
    return "";
  }

}

exports.ExpireContractsService = ExpireContractsService;