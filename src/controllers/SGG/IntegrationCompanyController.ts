import { Request, Response } from "express";
import { IntegrationCompanyService } from "../../services/SGG/IntegrationCompanyService";

class IntegrationCompanyController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const userId = req.userId;

    const integrationCompanyService = new IntegrationCompanyService();

    const company = await integrationCompanyService.execute({
      id,
      userId,
    });

    return res.json(company);
  }
}

export { IntegrationCompanyController };
