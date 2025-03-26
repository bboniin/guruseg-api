import { Request, Response } from 'express';
import { CreateLeadMasterService } from '../../services/Lead/CreateLeadMasterService';

class CreateLeadMasterController {
    async handle(req: Request, res: Response) {
        const { name, observation, email, location, cnpj, necessity, phone_number, employees } = req.body

        const createLeadMasterService = new CreateLeadMasterService

        const lead = await createLeadMasterService.execute({
            name, observation, email, location, cnpj, necessity, phone_number, employees
        })

        return res.json(lead)
    }
}

export { CreateLeadMasterController }