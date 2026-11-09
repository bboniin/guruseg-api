import { Request, Response } from "express";
import { EditPreliminaryCompanyService } from "../../services/PreliminaryCompany/EditPreliminaryCompanyService";

class EditPreliminaryCompanyController {
  async handle(req: Request, res: Response) {
    const company_id = req.params.company_id || req.params.id;
    const {
      razao_social,
      nome_fantasia,
      cnpj,
      type,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      status,
      functions,
      deleteFunctions,
    } = req.body;

    const editService = new EditPreliminaryCompanyService();
    const result = await editService.execute({
      company_id,
      razao_social,
      nome_fantasia,
      cnpj,
      type,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      status,
      functions,
      deleteFunctions,
    });

    return res.json(result);
  }
}

export { EditPreliminaryCompanyController };
