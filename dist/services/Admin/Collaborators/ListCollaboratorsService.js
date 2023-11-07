"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCollaboratorsService = void 0;

var _dateFns = require("date-fns");

var _prisma = _interopRequireDefault(require("../../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListCollaboratorsService {
  async execute({
    userId
  }) {
    const tecnicos = await _prisma.default.collaborator.findMany({
      where: {
        visible: true
      },
      orderBy: {
        create_at: "asc"
      }
    });
    let tecnicosTotal = {};
    tecnicos.map(item => {
      tecnicosTotal[item.id] = { ...item,
        total: 0
      };
    });
    const oss = await _prisma.default.order.findMany({
      where: {
        create_at: {
          gte: (0, _dateFns.addDays)(new Date(), -7)
        }
      },
      include: {
        items: true
      },
      orderBy: {
        create_at: "asc"
      }
    });
    oss.map(item => {
      let total = 0;
      item.items.map(item => {
        total += item.amount * item.value;
      });

      if (tecnicosTotal[item.collaborator_id]) {
        tecnicosTotal[item.collaborator_id].total += total;
      }
    });
    return Object.values(tecnicosTotal);
  }

}

exports.ListCollaboratorsService = ListCollaboratorsService;