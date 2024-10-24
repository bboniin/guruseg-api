import { Request, Response } from 'express';
import { CreateContractService } from '../../services/Contract/CreateContractService';

class CreateContractController {
    async handle(req: Request, res: Response) {
        const { services, risk, lifes, is_crm, name, services_gestao, company, contact, consultant, phone_number, banking, discount, service_name, service_value, lead_id, service_description, life_value, initial_value } = req.body

        let userId = req.userId

        const createContractService = new CreateContractService

        const order = await createContractService.execute({
            userId, services, is_crm, risk, lifes, name, services_gestao, company, contact, consultant, phone_number, banking, discount, service_name, service_value, lead_id, service_description, life_value, initial_value
        })

        return res.json(order)
    }
}

export { CreateContractController } 