import { Request, Response } from 'express';
import { EditCompanyService } from '../../services/Company/EditCompanyService';

class EditCompanyController {
    async handle(req: Request, res: Response) {
        const { 
            razao_social,
            nome_fantasia,
            cnpj,
            ramo_atividade,
            cep,
            endereco,
            nome_responsavel,
            cpf_responsavel,
            contato_responsavel,
            companySector
        } = req.body

        const { company_id } = req.params
        
        let userId = req.userId
        
        const editCompanyService = new EditCompanyService

        const company = await editCompanyService.execute({
            company_id: company_id,
            razao_social,
            nome_fantasia,
            cnpj,
            ramo_atividade,
            cep,
            userId,
            endereco,
            nome_responsavel,
            cpf_responsavel,
            contato_responsavel,
            companySector
        })

        return res.json(company)
    }
}

export { EditCompanyController } 