import { Request, Response } from 'express';
import { EditRenewalService } from '../../services/CompanyRenewal/EditRenewalService';

class EditRenewalController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

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
        
        const editRenewalService = new EditRenewalService

        const renewal = await editRenewalService.execute({
            id,
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

export { EditRenewalController } 