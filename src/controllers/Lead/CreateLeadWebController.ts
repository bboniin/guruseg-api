import { Request, Response } from 'express';
import { CreateLeadWebService } from '../../services/Lead/CreateLeadWebService';

class CreateLeadWebController {
    async handle(req: Request, res: Response) {
        const { name, observation, value, email, location, cnpj, necessity, phone_number, employees, send } = req.body

        console.log(req.body, req.query)

        if(req.headers.authorization != "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGUiLCJlbWFpbCI6InRlc3RlIiwiaWF0IjoxN"){
            throw new Error("Token inválido")
        }

        const createLeadWebService = new CreateLeadWebService

        const lead = await createLeadWebService.execute({
            name, observation, value, email, location, cnpj, necessity, phone_number, employees, send
        })

        return res.json(lead)
    }
}

export { CreateLeadWebController }