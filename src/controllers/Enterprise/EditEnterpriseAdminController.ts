import { Request, Response } from "express";
import { EditEnterpriseAdminService } from "../../services/Enterprise/EditEnterpriseAdminService";

class EditEnterpriseAdminController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const {
      user_id,
      razao_social,
      nome_fantasia,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      sgg_id,
      employee_count,
      esocial_renewal,
    } = req.body;

    const editEnterpriseAdminService = new EditEnterpriseAdminService();

    const enterprise = await editEnterpriseAdminService.execute({
      id,
      user_id,
      razao_social,
      nome_fantasia,
      ramo_atividade,
      cep,
      endereco,
      nome_responsavel,
      cpf_responsavel,
      contato_responsavel,
      observation,
      sgg_id,
      employee_count:
        employee_count !== undefined ? Number(employee_count) : undefined,
      esocial_renewal:
        esocial_renewal !== undefined ? Boolean(esocial_renewal) : undefined,
    });

    return res.json(enterprise);
  }
}

export { EditEnterpriseAdminController };
