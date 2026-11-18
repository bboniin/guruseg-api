"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminListContractsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AdminListContractsService {
  async execute({
    user_id,
    search,
    page
  }) {
    let filter = {
      user_id: user_id
    };
    if (search) {
      filter["name"] = {
        contains: search,
        mode: "insensitive"
      };
    }
    const contracts = await _prisma.default.contract.findMany({
      where: filter,
      orderBy: {
        update_at: "desc"
      },
      skip: page * 30,
      take: 30
    });
    const totalContracts = await _prisma.default.contract.count({
      where: filter,
      orderBy: {
        update_at: "desc"
      }
    });
    const totalContractsSigned = await _prisma.default.contract.count({
      where: {
        ...filter,
        status: "assinado"
      }
    });
    const totalContractsExpired = await _prisma.default.contract.count({
      where: {
        ...filter,
        status: "expirado"
      }
    });
    const totalContractsPedding = await _prisma.default.contract.count({
      where: {
        ...filter,
        status: "aguardando"
      }
    });
    const totalContractsNegotion = await _prisma.default.contract.count({
      where: {
        ...filter,
        status: "negociacao"
      }
    });
    const totalContractsRecused = await _prisma.default.contract.count({
      where: {
        ...filter,
        status: "recusado"
      }
    });
    return {
      contracts,
      totalContracts,
      infosContracts: {
        totalContractsSigned,
        totalContractsExpired,
        totalContractsPedding,
        totalContractsNegotion,
        totalContractsRecused
      }
    };
  }
}
exports.AdminListContractsService = AdminListContractsService;