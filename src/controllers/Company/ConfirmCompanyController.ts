import { Request, Response } from "express";
import { ConfirmCompanyService } from "../../services/Company/ConfirmCompanyService";

class ConfirmCompanyController {
  async handle(req: Request, res: Response) {
    const { company_id } = req.params;

    const confirmCompanyService = new ConfirmCompanyService();

    const company = await confirmCompanyService.execute({
      company_id: company_id,
    });

    return res.json(company);
  }
}

export { ConfirmCompanyController };
