"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompaniesConfirmService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListCompaniesConfirmService {
  async execute({
    userId
  }) {
    const companies = await _prisma.default.company.findMany({
      where: {
        collaborador_id: userId,
        status: "confirmado",
        order_id: 0
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
    return companies;
  }

}

exports.ListCompaniesConfirmService = ListCompaniesConfirmService;