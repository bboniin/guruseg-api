import { Request, Response } from "express";
import { DeleteLeadMatrizService } from "../../services/LeadMatriz/DeleteLeadMatrizService";

class DeleteLeadMatrizController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteLeadMatrizService = new DeleteLeadMatrizService();

    const lead = await deleteLeadMatrizService.execute({
      id: id || req.body.id,
    });

    return res.json(lead);
  }
}

export { DeleteLeadMatrizController };
