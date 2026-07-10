import { Request, Response } from "express";
import { EditRiskCompanyService } from "../../services/Company/EditRiskCompanyService";

class EditRiskCompanyController {
  async handle(req: Request, res: Response) {
    const {
      name,
      type,
      description,
      fonte_geradora,
      perigos,
      probabilidade,
      efeito,
      epcs,
      epis,
      tipo_exposicao,
      tempo_exposicao,
      company_id,
      medidas_controle,
    } = req.body;

    const { risk_id } = req.params;

    const userId = req.userId;

    const editRiskCompanyService = new EditRiskCompanyService();

    const company = await editRiskCompanyService.execute({
      name,
      type,
      description,
      fonte_geradora,
      perigos,
      probabilidade,
      efeito,
      epcs,
      epis,
      tipo_exposicao,
      tempo_exposicao,
      company_id,
      medidas_controle,
      userId,
      risk_id,
    });

    return res.json(company);
  }
}

export { EditRiskCompanyController };
