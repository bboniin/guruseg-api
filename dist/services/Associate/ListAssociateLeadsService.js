"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAssociateLeadsService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListAssociateLeadsService {
  async execute({
    associate_id,
    page,
    dateStart,
    dateEnd,
    status,
    search
  }) {
    let filter = {
      associate_id: associate_id
    };
    if (status) {
      if (status == "Pendente") {
        filter["leads"] = {
          none: {}
        };
      } else {
        filter["leads"] = {
          some: {
            status
          }
        };
      }
    }
    if (dateStart && dateEnd) {
      filter["create_at"] = {
        gte: (0, _dateFns.startOfDay)(new Date(dateStart)),
        lte: (0, _dateFns.endOfDay)(new Date(dateEnd))
      };
    }
    if (search) {
      filter["OR"] = [{
        name: {
          contains: search,
          mode: "insensitive"
        }
      }, {
        email: {
          contains: search,
          mode: "insensitive"
        }
      }];
    }
    const total = await _prisma.default.leadMaster.count({
      where: filter
    });
    const leads = await _prisma.default.leadMaster.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc"
      },
      include: {
        leads: {
          include: {
            user: true
          }
        }
      }
    });
    const s3Storage = new _S3Storage.default();
    const leadsResponse = await Promise.all(leads.map(async lead => {
      if (lead.leads?.[0]?.user.photo) {
        lead.leads[0].user["photo_url"] = await s3Storage.getTemporaryUrl(lead.leads[0].user.photo, 245);
      }
      return leadsResponse;
    }));
    return {
      leads: leadsResponse,
      total
    };
  }
}
exports.ListAssociateLeadsService = ListAssociateLeadsService;