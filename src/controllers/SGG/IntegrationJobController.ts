import { Request, Response } from "express";
import { IntegrationJobService } from "../../services/SGG/IntegrationJobService";

class IntegrationJobController {
  async handle(req: Request, res: Response) {
    const { company_id } = req.body;

    const { id } = req.params;

    const userId = req.userId;

    const integrationJobService = new IntegrationJobService();

    const jobResponse = await integrationJobService.execute({
      id,
      company_id,
      userId,
    });

    return res.json(jobResponse);
  }
}

export { IntegrationJobController };
