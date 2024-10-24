import prismaClient from '../../prisma'

interface ContractrRequest {
    userId: string;
    name: string;
    company: string;
    contact: string;
    consultant: string;
    phone_number: string;
    banking: string;
    risk: number;
    lifes: number;
    life_value: number;
    initial_value: number;
    discount: number;
    lead_id: string;
    service_name: string;
    service_value: number;
    service_description: string;
    services_gestao: string;
    is_crm: boolean;
    services: Array<[]>;
}

class CreateContractService {
    async execute({ userId, life_value, is_crm, lead_id, initial_value, services_gestao, services, risk, lifes, name, company, contact, consultant, phone_number, banking, discount, service_name, service_value, service_description }: ContractrRequest) {

        if (!name || !company || !contact || !consultant || !phone_number || !banking) {
            throw new Error("Preencha as informações básicas do contrato")
        }

        if (services.length == 0 && (!risk || !lifes || !life_value || !initial_value)) {
            throw new Error("Preencha pelo menos um serviço ou a Gestão Mensal")
        }

        let newContract = {
            user_id: userId,
            name, company, contact, consultant, phone_number, banking, lead_id, is_crm
        }

        if (risk && lifes && life_value && initial_value) {
            newContract["risk"] = risk
            newContract["lifes"] = lifes
            newContract["life_value"] = life_value
            newContract["initial_value"] = initial_value
            newContract["services_gestao"] = services_gestao
        }

        if (services.length != 0) {
            newContract["discount"] = discount
            if ((!service_name && service_value) || (service_name && !service_value)) {
                throw new Error("Adicionando serviço extra, é obrigatório preencher nome e valor.")
            }
            newContract["service_name"] = service_name
            newContract["service_value"] = service_value
            newContract["service_description"] = service_description
        }

        const contract = await prismaClient.contract.create({
            data: newContract
        })

        contract["services"] = []

        if(services.length != 0) {
            await Promise.all(
                services.map(async (data) => {
                    const itemcontract = await prismaClient.contractServices.create({
                        data: {
                            amount: parseInt(data["amount"]),
                            contract_id: contract.id,
                            name: data["name"],
                            value: parseFloat(data["value"]),
                            description: data["description"]
                        }
                    })
                    contract["services"].push(itemcontract)
                })    
            )
        }

        if(lead_id && is_crm){
            let valueContract = 0
            contract["services"].map((item) => {
                valueContract += item.amount * item.value
            })
            if (contract.service_value) {
                valueContract += contract.service_value
            }
            if (contract.discount) {
                valueContract -= contract.discount
            }
            await prismaClient.historic.create({
                data: {
                    lead_id: lead_id,
                    name: "Proposta enviada para o lead"
                }
            })
    
            await prismaClient.lead.update({
                where: {
                    id: lead_id
                },
                data: {
                    contract_id: contract.id,
                    status: "Proposta Enviada",
                    value: valueContract,
                    update_at: new Date()
                }
            })
        }

        return (contract)
    }
}

export { CreateContractService }