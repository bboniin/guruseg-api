"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmOrderService = void 0;

var _prisma = _interopRequireDefault(require("../../prisma"));

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ConfirmOrderService {
  async execute({
    userId,
    id,
    message
  }) {
    if (!id || !userId) {
      throw new Error("Preencha todos os campos.");
    }

    const orderGet = await _prisma.default.order.findUnique({
      where: {
        id: id
      },
      include: {
        user: true,
        items: true
      }
    });

    if (orderGet.collaborator_id) {
      throw new Error("Ordem de serviço já tem um técnico vinculado");
    }

    const tecnicos = await _prisma.default.collaborator.findMany({
      where: {
        enabled: true,
        visible: true,
        OR: [{
          sector: orderGet.sector
        }, {
          sector: "Todos"
        }]
      }
    });
    let tecnicosTotal = {};
    let collaborator = {
      id: null
    };
    const sectores = {
      "Serviços de segurança do Trabalho": orderGet.user.sector1_id,
      "Revenda de treinamentos online": orderGet.user.sector2_id,
      "Serviços Medicina ocupacional": orderGet.user.sector3_id,
      "Credenciamento SST": orderGet.user.sector4_id,
      "Assinatura Documentos SST": orderGet.user.sector5_id
    };

    if (sectores[orderGet.sector]) {
      collaborator.id = sectores[orderGet.sector];
    } else {
      tecnicos.map(item => {
        tecnicosTotal[item.id] = {
          oss: 0,
          total: 0
        };
      });

      if (tecnicos.length != 0) {
        let total = 0;
        orderGet.items.map(item => {
          total += item.amount * item.value;
        });

        if (total > 100) {
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
          tecnicos.map(item => {
            item["orders"] = tecnicosTotal[item.id].total;
          });
          collaborator = tecnicos.reduce((a, b) => {
            if (b["orders"] < a["orders"]) a = b;
            return a;
          });
        } else {
          const orders = await _prisma.default.order.findMany({
            take: tecnicos.length - 1,
            where: {
              AND: [{
                collaborator_id: {
                  not: null
                }
              }, {
                status: {
                  not: "cancelado"
                }
              }, {
                status: {
                  not: "recusado"
                }
              }, {
                status: {
                  not: "aberto"
                }
              }],
              id: {
                not: orderGet.id
              },
              sector: orderGet.sector
            },
            orderBy: {
              create_at: "desc"
            }
          });
          orders.map(item => {
            if (item.collaborator_id && tecnicosTotal[item.collaborator_id] != undefined) {
              tecnicosTotal[item.collaborator_id].oss++;
            }
          });
          tecnicos.map(item => {
            item["orders"] = tecnicosTotal[item.id].oss;
          });
          collaborator = tecnicos.reduce((a, b) => {
            if (b["orders"] < a["orders"]) a = b;
            return a;
          });
        }
      }
    }

    const order = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        message: message,
        status: collaborator.id ? "andamento" : "aberto",
        collaborator_id: collaborator.id
      },
      include: {
        collaborator: true
      }
    });

    if (collaborator.id) {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "receivedOS.hbs");

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
        subject: "[Guruseg] Recebimento de OS",
        html: templateHTML
      });
    }

    return order;
  }

}

exports.ConfirmOrderService = ConfirmOrderService;