import { Request, Response } from 'express';
import { EditContractService } from '../../services/Contract/EditContractService';

class EditContractController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { services, risk, lifes, name, services_gestao, company, contact, consultant, phone_number, banking, discount, service_name, service_value, service_description, life_value, initial_value } = req.body

        let userId = req.userId

        const editContractService = new EditContractService

        const order = await editContractService.execute({
            userId, services, contract_id: id, risk, lifes, name, services_gestao, company, contact, consultant, phone_number, banking, discount, service_name, service_value, service_description, life_value, initial_value
        })

        return res.json(order)
    }
}

export { EditContractController } 