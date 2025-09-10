import { Request, Response } from "express";
import { BuyLeadService } from "../../services/Lead/BuyLeadService";

class BuyLeadController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const { id } = req.params;

    const buyLeadService = new BuyLeadService();

    const lead = await buyLeadService.execute({
      userId,
      lead_id: id,
    });

    return res.json(lead);
  }
}

export { BuyLeadController };
