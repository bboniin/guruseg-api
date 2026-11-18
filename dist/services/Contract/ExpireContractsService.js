"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpireContractsService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
        if (item.lead_id) {
          await _prisma.default.historic.create({
            data: {
              lead_id: item.lead_id,
              name: "Proposta expirou, Cliente perdido"
            }
          });
          await _prisma.default.lead.update({
            where: {
              id: item.lead_id
            },
            data: {
              status: "Cliente Perdido",
              update_at: new Date()
            }
          });
        }
      }
    });
    return "";
  }
}
exports.ExpireContractsService = ExpireContractsService;