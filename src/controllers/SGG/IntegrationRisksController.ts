import { Request, Response } from "express";
import { IntegrationRisksService } from "../../services/SGG/IntegrationRisksService";

class IntegrationRisksController {
  async handle(req: Request, res: Response) {
    const { company_id } = req.body;

    const { id } = req.params;

    const userId = req.userId;

    const integrationRisksService = new IntegrationRisksService();

    const riskResponse = await integrationRisksService.execute({
      id,
      company_id,
      userId,
    });

    return res.json(riskResponse);
  }
}

export { IntegrationRisksController };
