"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StatusOrderService {
  async execute({
    id,
    userId,
    status,
    message
  }) {
    const order = await _prisma.default.order.findFirst({
      where: {
        id: id
      },
      include: {
        user: true,
        collaborator: true
      }
    });

    if (order.status == "aberto" || order.status == "finalizado") {
      throw new Error("Ordem de serviço está aberta ou já foi finalizada.");
    }

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

    if (status == "alteracao") {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "changeOS.hbs");

      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

      const templateParse = _handlebars.default.compile(templateFileContent);

      const templateHTML = templateParse({
        id: order.id,
        name: order.collaborator.name
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
        subject: "[Guruseg] Atualização Ordem de Serviço",
        html: templateHTML
      });
    }

    if (status == "finalizado") {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "finishedOS.hbs");

      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

      const templateParse = _handlebars.default.compile(templateFileContent);

      const templateHTML = templateParse({
        id: order.id,
        name: order.user.name
      });
      await transport.sendMail({
        from: {
          name: "Equipe Guruseg",
          address: "leonardo@guruseg.com.br"
        },
        to: [{
          name: order.user.name,
          address: order.user.email
        }, {
          name: order.collaborator.name,
          address: order.collaborator.email
        }],
        subject: "[Guruseg] Atualização Ordem de Serviço",
        html: templateHTML
      });
    }

    if (status == "validacao") {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "validationOS.hbs");

      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

      const templateParse = _handlebars.default.compile(templateFileContent);

      const templateHTML = templateParse({
        id: order.id,
        name: order.user.name
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
    }

    const orderD = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        status: status,
        message: message,
        update_at: new Date()
      }
    });
    return orderD;
  }

}

exports.StatusOrderService = StatusOrderService;