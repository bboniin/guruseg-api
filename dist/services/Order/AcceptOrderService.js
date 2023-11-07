"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AcceptOrderService {
  async execute({
    id,
    userId,
    message
  }) {
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
      },
      include: {
        user: true
      }
    });

    if (!order) {
      throw new Error("Ordem de serviço já excluida.");
    }

    if (order.collaborator_id) {
      throw new Error("Ordem de serviço já foi aceita por outro técnico.");
    }

    const path = (0, _path.resolve)(__dirname, "..", "..", "views", "acceptOS.hbs");

    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHTML = templateParse({
      id: order.id,
      name: order.user.name
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
        name: order.user.name,
        address: order.user.email
      },
      subject: "[Guruseg] Atualização Ordem de Serviço",
      html: templateHTML
    });
    const orderD = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        status: "andamento",
        message: message,
        update_at: new Date(),
        collaborator_id: userId
      }
    });
    return orderD;
  }

}

exports.AcceptOrderService = AcceptOrderService;