"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListContractsService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListContractsService {
  async execute({
    userId,
    lead_id,
    search,
    status,
    page
  }) {
    let filter = lead_id ? {
      user_id: userId,
      lead_id: lead_id
    } : {
      user_id: userId
    };
    if (search) {
      filter["name"] = {
        contains: search,
        mode: "insensitive"
      };
    }
    if (status) {
      filter["status"] = status;
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
exports.ListContractsService = ListContractsService;