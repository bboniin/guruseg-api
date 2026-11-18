"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditContractService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditContractService {
  async execute({
    userId,
    life_value,
    contract_id,
    initial_value,
    services_gestao,
    services,
    risk,
    lifes,
    name,
    company,
    contact,
    consultant,
    phone_number,
    banking,
    discount,
    service_name,
    service_value,
    service_description
  }) {
    const contractGet = await _prisma.default.contract.findFirst({
      where: {
        id: contract_id,
        user_id: userId
      }
    });
    if (!contractGet) {
      throw new Error("Contrato não encontrado");
    }
    if (contractGet.status == "assinado") {
      throw new Error("Contrato já foi assinado");
    }
    if (!name || !company || !contact || !consultant || !phone_number || !banking) {
      throw new Error("Preencha as informações básicas do contrato");
    }
    if (services.length == 0 && (!risk || !lifes || !life_value || !initial_value)) {
      throw new Error("Preencha pelo menos um serviço ou a Gestão Mensal");
    }
    let editContract = {
      user_id: userId,
      name,
      company,
      contact,
      consultant,
      phone_number,
      banking,
      status: contractGet.status == "negociacao" ? "aguardando" : contractGet.status
    };
    if (risk && lifes && life_value && initial_value) {
      editContract["risk"] = risk;
      editContract["lifes"] = lifes;
      editContract["life_value"] = life_value;
      editContract["initial_value"] = initial_value;
      editContract["services_gestao"] = services_gestao;
    }
    if (services.length != 0) {
      editContract["discount"] = discount;
      if (!service_name && service_value || service_name && !service_value) {
        throw new Error("Adicionando serviço extra, é obrigatório preencher nome e valor.");
      }
      editContract["service_name"] = service_name;
      editContract["service_value"] = service_value;
      editContract["service_description"] = service_description;
    }
    const contract = await _prisma.default.contract.update({
      where: {
        id: contract_id
      },
      data: editContract,
      include: {
        services: true
      }
    });
    const arraysDelete = contract.services.filter(item => !services.some(data => item.id === data["id"]));
    await Promise.all(arraysDelete.map(async item => await _prisma.default.contractServices.delete({
      where: {
        id: item.id
      }
    })));
    contract["services"] = [];
    if (services.length != 0) {
      await Promise.all(services.map(async data => {
        if (data["id"]) {
          const itemcontract = await _prisma.default.contractServices.update({
            where: {
              id: data["id"]
            },
            data: {
              amount: parseInt(data["amount"]),
              contract_id: contract.id,
              name: data["name"],
              value: parseFloat(data["value"]),
              description: data["description"]
            }
          });
          contract["services"].push(itemcontract);
        } else {
          const itemcontract = await _prisma.default.contractServices.create({
            data: {
              amount: parseInt(data["amount"]),
              contract_id: contract.id,
              name: data["name"],
              value: parseFloat(data["value"]),
              description: data["description"]
            }
          });
          contract["services"].push(itemcontract);
        }
      }));
    }
    if (contractGet.lead_id && contractGet.is_crm) {
      let valueContract = 0;
      contract["services"].map(item => {
        valueContract += item.amount * item.value;
      });
      if (contract.service_value) {
        valueContract += contract.service_value;
      }
      if (contract.discount) {
        valueContract -= contract.discount;
      }
      let data = {
        contract_id: contract.id,
        value: valueContract,
        update_at: new Date()
      };
      if (contractGet.status == "negociacao") {
        data["status"] = 'Proposta Enviada';
        await _prisma.default.historic.create({
          data: {
            lead_id: contractGet.lead_id,
            name: "Proposta enviada após negociação"
          }
        });
      }
      await _prisma.default.lead.update({
        where: {
          id: contractGet.lead_id
        },
        data: data
      });
    }
    return contract;
  }
}
exports.EditContractService = EditContractService;