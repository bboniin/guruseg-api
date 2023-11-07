"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandlerOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HandlerOrderService {
  async execute({
    message,
    userId,
    order_id,
    items
  }) {
    if (items.length == 0 || !userId || !order_id) {
      throw new Error("Preencha todos os campos.");
    }

    const order = await _prisma.default.order.findUnique({
      where: {
        id: order_id
      },
      include: {
        items: true,
        user: true,
        collaborator: true
      }
    });

    if (userId != order.user.id) {
      throw new Error("Essa ordem de serviço não está vinculada a sua conta");
    }

    if (message) {
      await _prisma.default.order.update({
        where: {
          id: order_id
        },
        data: {
          message: message
        }
      });
    }

    items.map(async data => {
      let [oldService] = order["items"].filter(item => {
        return data["name"] == item.name;
      });

      if (oldService) {
        await _prisma.default.item.update({
          where: {
            id: oldService.id
          },
          data: {
            amount: oldService["amount"] + data["amount"]
          }
        });
      } else {
        await _prisma.default.item.create({
          data: {
            amount: data["amount"],
            order_id: order.id,
            name: data["name"],
            value: data["value"],
            commission: data["commission"],
            description: data["description"]
          }
        });
      }
    });

    if (order.collaborator) {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "handlerOS.hbs");

      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

      const templateParse = _handlebars.default.compile(templateFileContent);

      const templateHTML = templateParse({
        id: order.id,
        name: order.collaborator.name
      });
      var transport = await _nodemailer.default.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "leonardo@guruseg.com.br",
          pass: "suimoooumyjdbqct"
        }
      });
      await transport.sendMail({
        from: {
          name: "Equipe Guruseg",
          address: "leonardo@guruseg.com.br"
        },
        to: {
          name: order.collaborator.name,
          address: order.collaborator.email
        },
        subject: `[Guruseg] Novos serviços na OS #${order.id}`,
        html: templateHTML
      });
    }

    return order.id;
  }

}

exports.HandlerOrderService = HandlerOrderService;