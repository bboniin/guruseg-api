"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationRisksService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _prisma = _interopRequireDefault(require("../../prisma"));
var _dateFns = require("date-fns");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class IntegrationRisksService {
  async execute({
    id,
    company_id,
    userId
  }) {
    const collaborator = await _prisma.default.collaborator.findUnique({
      where: {
        id: userId
      }
    });
    if (!collaborator) {
      throw new Error("Técnico não encontrado");
    }
    const company = await _prisma.default.company.findUnique({
      where: {
        id: company_id
      }
    });
    if (!company) {
      throw new Error("Empresa não encontrada");
    }
    const sector = await _prisma.default.companySector.findUnique({
      where: {
        id: id
      },
      include: {
        companyScratchs: true,
        companyEmployees: true
      }
    });
    if (!sector) {
      throw new Error("Setor não encontrado");
    }
    if (!sector.companyScratchs) {
      throw new Error("Nenhum risco encontrado");
    }
    if (!sector.sgg_id) {
      throw new Error("Vincule primeiro o setor para depois vincular os riscos");
    }
    if (sector.sgg_risks_id) {
      throw new Error("Riscos já vinculados ao SGG");
    }
    const cargos = sector.companyEmployees.map(item => {
      return {
        nome: item.name,
        CBO: item.cbo,
        funcao: item.name
      };
    });
    const cargosId = sector.companyEmployees.map(item => {
      return item.sgg_id;
    });
    const riscos = sector.companyScratchs.map(item => {
      return {
        risco: item.name,
        envia_esocial: "Não",
        matriz_risco: "AIHA",
        atividades: item.description,
        perigos: item.perigos,
        tipo_avaliacao: "Qualitativa",
        fontes_geradoras: item.fonte_geradora.split(","),
        dados_adicionais: {
          observacoes: `EPI´s: ${item.epis}\nEPC´s: ${item.epcs}\nMedidas de Controle: ${item.medidas_controle}`
        },
        tempo_exposicao: {
          tipo: item.tipo_exposicao,
          detalhes: item.tempo_exposicao
        },
        peso_criterio_nivel_1: item.probabilidade,
        peso_criterio_nivel_2: item.efeito
      };
    });
    let error = "";
    let sggId = "";
    await _axios.default.post("https://app.sgg.net.br/api/v3/avaliacao_de_riscos/", {
      empresa: company.sgg_id,
      id_setor: sector.sgg_id,
      ids_cargos: cargosId,
      cargos: cargos,
      data: (0, _dateFns.format)(new Date(), "yyyy-MM-dd"),
      data_validade: (0, _dateFns.format)((0, _dateFns.addYears)(new Date(), 1), "yyyy-MM-dd"),
      riscos: riscos
    }, {
      auth: {
        username: process.env.SGG_USER || "",
        password: ""
      }
    }).then(response => {
      console.log({
        empresa: company.sgg_id,
        id_setor: sector.sgg_id,
        ids_cargos: cargosId,
        cargos: cargos,
        data: (0, _dateFns.format)(new Date(), "yyyy-MM-dd"),
        data_validade: (0, _dateFns.format)((0, _dateFns.addYears)(new Date(), 1), "yyyy-MM-dd"),
        riscos: riscos
      }, {
        username: process.env.SGG_USER || "",
        password: ""
      });
      console.log(0, response);
      console.log(1, response.data);
      const returnJSON = JSON.parse(response.data.replace(/"({.*?})"/g, (match, p1) => {
        return JSON.stringify(p1);
      }));
      console.log(2, returnJSON);
      const returnData = JSON.parse(returnJSON.returnInfo);
      console.log(3, returnData);
      if (returnData.erro) {
        error = returnData.msg;
        throw new Error(returnData.msg);
      }
      sggId = returnData.id;
    }).catch(error => {
      console.log(4, error);
      error = error.message || "Ocorreu um erro inesperado, contate o suporte";
    });
    if (error) {
      throw new Error(error);
    }
    await _prisma.default.companySector.update({
      where: {
        id: id
      },
      data: {
        sgg_risks_id: sggId
      }
    });
  }
}
exports.IntegrationRisksService = IntegrationRisksService;