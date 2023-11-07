"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinishedOSsService = void 0;

var _dateFns = require("date-fns");

var _prisma = _interopRequireDefault(require("../../prisma"));

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FinishedOSsService {
  async execute() {
    const orders = await _prisma.default.order.findMany({
      where: {
        status: "validacao"
      },
      include: {
        user: true,
        collaborator: true
      }
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
    orders.map(async item => {
      if ((0, _dateFns.differenceInDays)(item.update_at, new Date()) <= -2) {
        const path = (0, _path.resolve)(__dirname, "..", "..", "views", "finishedOS.hbs");

        const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

        const templateParse = _handlebars.default.compile(templateFileContent);

        const templateHTML = templateParse({
          id: item.id,
          name: item.user.name
        });
        await transport.sendMail({
          from: {
            name: "Equipe Guruseg",
            address: "leonardo@guruseg.com.br"
          },
          to: [{
            name: item.user.name,
            address: item.user.email
          }, {
            name: item.collaborator.name,
            address: item.collaborator.email
          }],
          subject: "[Guruseg] Atualização Ordem de Serviço",
          html: templateHTML
        });
        await _prisma.default.order.update({
          where: {
            id: item.id
          },
          data: {
            status: "finalizado",
            message: "",
            update_at: new Date()
          }
        });
      }
    });
    return "";
  }

}

exports.FinishedOSsService = FinishedOSsService;