"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLeadsDiarieService = void 0;
var _dateFns = require("date-fns");
var _prisma = _interopRequireDefault(require("../../prisma"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateLeadsDiarieService {
  async execute() {
    let leads = [];
    await _axios.default.post("https://api.casadosdados.com.br/v5/cnpj/pesquisa", {
      situacao_cadastral: ["ATIVA"],
      uf: ["sc", "sp", "to", "ro", "rs", "rj", "pi", "pa", "mt", "ma", "ce", "ba", "am", "ap", "df", "es", "pr", "rn", "al", "pb", "pe", "go", "pr"],
      data_abertura: {
        inicio: (0, _dateFns.format)(new Date(), "yyyy-MM-dd"),
        fim: (0, _dateFns.format)(new Date(), "yyyy-MM-dd")
      },
      capital_social: {
        minimo: 50000
      },
      mais_filtros: {
        somente_matriz: true,
        somente_filial: false,
        com_email: true,
        com_telefone: true,
        somente_fixo: false,
        somente_celular: true,
        excluir_empresas_visualizadas: true,
        excluir_email_contab: true
      },
      limite: 1000,
      pagina: 1
    }, {
      headers: {
        "Content-Type": "application/json",
        "api-key": "54735aedbbbf71ae91a08664e0cc43a23a7df81672d1baff7750b2fd771a3de0719373ef76c874adb6695080a168379722f4e1e4f68b5e3fb50580f329f212b1"
      }
    }).then(response => {
      console.log("Aq foi LEADS", response.data?.total || 0);
      leads = response.data?.cnpjs || [];
    }).catch(() => {
      console.log(`Erro carregar leads dia ${(0, _dateFns.format)((0, _dateFns.addDays)(new Date(), -1), "dd/MM/yyyy")}`);
    });
    await _prisma.default.leadMaster.deleteMany({
      where: {
        tag: "API",
        leads: {
          none: {}
        }
      }
    });
    await Promise.all(leads.map(async (item, index) => {
      await _axios.default.get(`https://api.casadosdados.com.br/v4/cnpj/${item.cnpj}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": "54735aedbbbf71ae91a08664e0cc43a23a7df81672d1baff7750b2fd771a3de0719373ef76c874adb6695080a168379722f4e1e4f68b5e3fb50580f329f212b1"
        }
      }).then(async response => {
        const lead = response.data;
        await _prisma.default.leadMaster.create({
          data: {
            name: lead.razao_social,
            value: 0,
            email: lead.contato_email[0].email,
            phone_number: `(${lead.contato_telefonico[0].ddd}) ${lead.contato_telefonico[0].numero}`,
            observation: "",
            employees: "",
            necessity: "ASO, PGR, PCMSO, LTCAT e SST Ao E-social",
            cnpj: lead.cnpj,
            price: 2.97,
            tag: "API",
            location: `${lead.endereco.municipio} - ${lead.endereco.uf}`
          }
        });
      }).catch(() => {
        console.log(`Erro carregar lead ${index} dia ${(0, _dateFns.format)((0, _dateFns.addDays)(new Date(), -1), "dd/MM/yyyy")}`);
      });
    }));
    return "";
  }
}
exports.CreateLeadsDiarieService = CreateLeadsDiarieService;