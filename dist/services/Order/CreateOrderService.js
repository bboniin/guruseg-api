"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateOrderService {
  async execute({
    observation,
    userId,
    name,
    items,
    month,
    urgent,
    sector,
    company_id
  }) {
    if (items.length == 0 || !userId || !month || !sector) {
      throw new Error("Preencha todos os campos.");
    }

    const order = await _prisma.default.order.create({
      data: {
        observation: observation,
        user_id: userId,
        month: month,
        name: name,
        company_id: company_id,
        sector: sector,
        urgent: urgent,
        status: "pendente"
      }
    });
    console.log(company_id);

    if (company_id) {
      let company = await _prisma.default.company.update({
        where: {
          id: company_id
        },
        data: {
          order_id: order.id
        }
      });
      console.log(company);
    }

    order["items"] = [];
    items.map(async data => {
      const itemOrder = await _prisma.default.item.create({
        data: {
          amount: data["amount"],
          order_id: order.id,
          name: data["name"],
          value: data["value"],
          commission: data["commission"],
          description: data["description"]
        }
      });
      order["items"].push(itemOrder);
    });
    return order;
  }

}

exports.CreateOrderService = CreateOrderService;