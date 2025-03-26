import { Request, Response } from 'express';
import { CreateRenewalService } from '../../services/CompanyRenewal/CreateRenewalService';

class CreateRenewalController {
    async handle(req: Request, res: Response) {
        const { 
            razao_social,
            observation,
            fantasia,
            type,
            cpf,
            cnpj,
            phone_number,
            whatsapp,
            region,
            date_init,
            date_renewal
        } = req.body
        
        const createRenewalService = new CreateRenewalService

        const renewal = await createRenewalService.execute({
            razao_social,
            observation,
            fantasia,
            type,
            cpf,
            cnpj,
            phone_number,
            whatsapp,
            region,
            date_init,
            date_renewal
        })

        return res.json(renewal)
    }
}

export { CreateRenewalController } 