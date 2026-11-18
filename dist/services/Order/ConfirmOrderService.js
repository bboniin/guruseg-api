"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmOrderService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
var _path = require("path");
var _fs = _interopRequireDefault(require("fs"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _dateFns = require("date-fns");
var _resend = require("resend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ConfirmOrderService {
  async execute({
    userId,
    id
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
        items: true,
        messages: true,
        docs: true,
        enterprise: true
      }
    });
    if (orderGet.collaborator_id) {
      throw new Error("Ordem de serviço já tem um técnico vinculado");
    }
    if (!orderGet.docs.length) {
      throw new Error("Envie pelo menos um documento para confirmar o envio da documentação");
    }
    const tecnico = await _prisma.default.collaborator.findFirst({
      where: {
        enabled: true,
        visible: true,
        OR: [{
          sector: "Todos"
        }, {
          sector: orderGet.sector
        }],
        user_id: userId
      }
    });
    let tecnicosTotal = {};
    let collaborator = {
      id: null
    };
    if (!tecnico) {
      const tecnicos = await _prisma.default.collaborator.findMany({
        where: {
          enabled: true,
          visible: true,
          user_id: "",
          OR: [{
            sector: orderGet.sector
          }, {
            sector: "Todos"
          }]
        }
      });
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
                items: true,
                messages: true
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
    } else {
      collaborator = tecnico;
    }
    if (!collaborator) {
      throw new Error("Nenhum técnico encontrado para sua OS, contate o suporte");
    }
    const order = await _prisma.default.order.update({
      where: {
        id: id
      },
      data: {
        status: "andamento",
        collaborator_id: collaborator.id,
        delivery_date: (0, _dateFns.addBusinessDays)(new Date(), orderGet.delivery_time)
      },
      include: {
        items: true,
        messages: true,
        collaborator: true
      }
    });
    order["totalServices"] = 0;
    order["totalValue"] = 0;
    order.items.map(item => {
      order["totalServices"] += item.amount;
      order["totalValue"] += item.value * item.amount;
    });
    if (!orderGet.urgent && collaborator.id) {
      const path = (0, _path.resolve)(__dirname, "..", "..", "views", "receivedOS.hbs");
      const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");
      const templateParse = _handlebars.default.compile(templateFileContent);
      const templateHTML = templateParse({
        id: order.id,
        name: order.collaborator.name
      });
      const resend = new _resend.Resend(process.env.RESEND_KEY);
      await resend.emails.send({
        from: "Equipe Guruseg <noreply@gurusegead.com.br>",
        to: order.collaborator.email,
        subject: "[Guruseg] Recebimento de OS",
        html: templateHTML
      });
    }
    return order;
  }
}
exports.ConfirmOrderService = ConfirmOrderService;