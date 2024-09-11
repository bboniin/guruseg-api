import { Request, Response } from 'express';
import { CreateLeadService } from '../../services/Lead/CreateLeadService';

class CreateLeadController {
    async handle(req: Request, res: Response) {
        const { name, observation, value, email, location, cnpj, necessity, phone_number, employees } = req.body

        let userId = req.userId

        const createLeadService = new CreateLeadService

        const lead = await createLeadService.execute({
            userId, name, observation, value, email, location, cnpj, necessity, phone_number, employees
        })

        return res.json(lead)
    }
}

export { CreateLeadController }