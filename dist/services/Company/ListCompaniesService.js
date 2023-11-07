"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompaniesService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListCompaniesService {
  async execute({
    userId
  }) {
    const companies = await _prisma.default.company.findMany({
      where: {
        collaborador_id: userId
      },
      orderBy: {
        update_at: "desc"
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc"
          }
        }
      }
    });
    const status = {
      "expirado": 0,
      "aguardando": 1,
      "concluido": 2,
      "alteracao": 1
    };
    let companiesStatus = companies.sort(function (a, b) {
      return status[a.status] < status[b.status] ? -1 : status[a.status] > status[b.status] ? 1 : 0;
    });
    return companiesStatus;
  }

}

exports.ListCompaniesService = ListCompaniesService;