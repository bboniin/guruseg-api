import { Request, Response } from "express";
import { EditEnterpriseService } from "../../services/Enterprise/EditEnterpriseService";

class EditEnterpriseController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const {
      razao_social,
      nome_fantasia,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
    } = req.body;

    const userId = req.userId;

    const editEnterpriseService = new EditEnterpriseService();

    const enterprise = await editEnterpriseService.execute({
      id,
      userId,
      razao_social,
      nome_fantasia,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
    });

    return res.json(enterprise);
  }
}

export { EditEnterpriseController };
