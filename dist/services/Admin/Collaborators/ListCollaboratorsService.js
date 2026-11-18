"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCollaboratorsService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../../prisma"));
var _S3Storage = _interopRequireDefault(require("../../../utils/S3Storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListCollaboratorsService {
  async execute({
    userId,
    page,
    filter,
    all
  }) {
    const admin = await _prisma.default.admin.findUnique({
      where: {
        id: userId
      }
    });
    if (!admin && !all) {
      throw new Error("Rota restrita ao administrador");
    }
    let filterSearch = {};
    if (all) {
      const collaborators = await _prisma.default.collaborator.findMany({
        where: {
          visible: true
        },
        orderBy: {
          create_at: "asc"
        }
      });
      return {
        collaborators
      };
    }
    if (filter) {
      filterSearch["name"] = {
        contains: filter,
        mode: "insensitive"
      };
    }
    const collaboratorsTotal = await _prisma.default.collaborator.count({
      where: {
        visible: true,
        ...filterSearch
      }
    });
    const collaborators = await _prisma.default.collaborator.findMany({
      where: {
        visible: true,
        ...filterSearch
      },
      orderBy: {
        create_at: "asc"
      },
      skip: page * 30,
      take: 30,
      include: {
        orders: {
          where: {
            create_at: {
              gte: (0, _dateFns.addDays)(new Date(), -7)
            }
          },
          include: {
            items: true,
            messages: true
          },
          orderBy: {
            create_at: "asc"
          }
        }
      }
    });
    collaborators.map(data => {
      data["totalWeek"] = 0;
      data.orders.map(item => {
        item.items.map(item => {
          data["totalWeek"] += item.amount * item.commission;
        });
      });
    });
    const s3Storage = new _S3Storage.default();
    const collaboratorsResponse = await Promise.all(collaborators.map(async collaborator => {
      if (collaborator.photo) {
        collaborator["photo_url"] = await s3Storage.getTemporaryUrl(collaborator.photo, 245);
      }
      return collaborator;
    }));
    return {
      collaborators: collaboratorsResponse,
      collaboratorsTotal
    };
  }
}
exports.ListCollaboratorsService = ListCollaboratorsService;