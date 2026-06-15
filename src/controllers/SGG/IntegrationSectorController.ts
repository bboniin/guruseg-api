import { Request, Response } from "express";
import { IntegrationSectorService } from "../../services/SGG/IntegrationSectorService";

class IntegrationSectorController {
  async handle(req: Request, res: Response) {
    const { company_id } = req.body;

    const { id } = req.params;

    const userId = req.userId;

    const integrationSectorService = new IntegrationSectorService();

    const sectorResponse = await integrationSectorService.execute({
      id: id,
      company_id,
      userId,
    });

    return res.json(sectorResponse);
  }
}

export { IntegrationSectorController };
