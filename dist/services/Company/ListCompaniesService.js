"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompaniesService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListCompaniesService {
  async execute({
    userId,
    search,
    page,
    status
  }) {
    let filter = {
      collaborador_id: userId
    };
    if (search) {
      filter["razao_social"] = {
        contains: search,
        mode: "insensitive"
      };
    }
    if (status) {
      filter["status"] = status;
    }
    const companies = await _prisma.default.company.findMany({
      where: filter,
      orderBy: {
        update_at: "desc"
      },
      skip: page * 30,
      take: 30,
      include: {
        companySector: {
          orderBy: {
            create_at: "asc"
          }
        }
      }
    });
    const totalCompanies = await _prisma.default.company.count({
      where: filter,
      orderBy: {
        update_at: "desc"
      }
    });
    const totalCompaniesConfirmed = await _prisma.default.company.count({
      where: {
        ...filter,
        status: "confirmado"
      }
    });
    const totalCompaniesExpired = await _prisma.default.company.count({
      where: {
        ...filter,
        status: "expirado"
      }
    });
    const totalCompaniesPedding = await _prisma.default.company.count({
      where: {
        ...filter,
        status: "aguardando"
      }
    });
    const totalCompaniesHandler = await _prisma.default.company.count({
      where: {
        ...filter,
        status: "alteracao"
      }
    });
    return {
      companies,
      totalCompanies,
      infosTotalCompanies: {
        totalCompaniesConfirmed,
        totalCompaniesExpired,
        totalCompaniesPedding,
        totalCompaniesHandler
      }
    };
  }
}
exports.ListCompaniesService = ListCompaniesService;