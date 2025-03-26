import { Request, Response } from 'express';
import { ConfirmCompanyService } from '../../services/Company/ConfirmCompanyService';

class ConfirmCompanyController {
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
            signature,
            companySector
        } = req.body

        const { company_id } = req.params
        
        const confirmCompanyService = new ConfirmCompanyService

        const company = await confirmCompanyService.execute({
            company_id: company_id,
            razao_social,
            nome_fantasia,
            cnpj,
            ramo_atividade,
            cep,
            endereco,
            nome_responsavel,
            cpf_responsavel,
            contato_responsavel,
            signature,
            companySector
        })

        return res.json(company)
    }
}

export { ConfirmCompanyController } 