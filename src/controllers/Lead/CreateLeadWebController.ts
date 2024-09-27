import { Request, Response } from 'express';
import { CreateLeadWebService } from '../../services/Lead/CreateLeadWebService';

class CreateLeadWebController {
    async handle(req: Request, res: Response) {

        if(req.query){
            const { name, observation, value, email, location, cnpj, necessity, phone_number, employees, tag } = req.query

            const createLeadWebService = new CreateLeadWebService

            const lead = await createLeadWebService.execute({
                name: String(name), observation: String(observation), 
                value: Number(value) > 0 ? Number(value) : 0,
                phone_number: String(phone_number), tag: String(tag),
                location: String(location), email: String(email), 
                necessity: String(necessity), cnpj: String(cnpj), 
                employees: String(employees)
            })

            return res.json(lead)
        }else{
            const { name, observation, value, email, location, cnpj, necessity, phone_number, employees, tag } = req.body

            const createLeadWebService = new CreateLeadWebService

            const lead = await createLeadWebService.execute({
                name, observation, value, email, location, cnpj, necessity, phone_number, employees, tag
            })

            return res.json(lead)
        }
    }
}

export { CreateLeadWebController }