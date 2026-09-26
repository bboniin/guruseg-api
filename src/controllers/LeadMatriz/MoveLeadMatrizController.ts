import { Request, Response } from "express";
import { MoveLeadMatrizService } from "../../services/LeadMatriz/MoveLeadMatrizService";

class MoveLeadMatrizController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    const moveLeadMatrizService = new MoveLeadMatrizService();

    const lead = await moveLeadMatrizService.execute({
      id: id || req.body.id,
      status,
    });

    return res.json(lead);
  }
}

export { MoveLeadMatrizController };
