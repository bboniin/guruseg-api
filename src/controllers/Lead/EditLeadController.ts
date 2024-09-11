import { Request, Response } from 'express';
import { EditLeadService } from '../../services/Lead/EditLeadService';

class EditLeadController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { name, observation, value, email, location, cnpj, necessity, phone_number, employees } = req.body

        const editLeadService = new EditLeadService

        const lead = await editLeadService.execute({
            name, id, observation, value, email, location, cnpj, necessity, phone_number, employees
        })

        return res.json(lead)
    }
}

export { EditLeadController } 