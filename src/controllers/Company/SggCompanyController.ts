import { Request, Response } from "express";
import { SggCompanyService } from "../../services/Company/SggCompanyService";

class SggCompanyController {
  async handle(req: Request, res: Response) {
    const { sgg_id } = req.body;

    const { company_id } = req.params;

    let userId = req.userId;

    const sggCompanyService = new SggCompanyService();

    const company = await sggCompanyService.execute({
      company_id: company_id,
      sgg_id,
      userId,
    });

    return res.json(company);
  }
}

export { SggCompanyController };
