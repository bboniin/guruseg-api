import { Request, Response } from "express";
import { GetRiskDetailsService } from "../../services/IA/GetRiskDetailsService";

class GetRiskDetailsController {
  async handle(req: Request, res: Response) {
    const { name, sector, type } = req.query;

    const getRiskDetailsService = new GetRiskDetailsService();

    const resRisks = await getRiskDetailsService.execute({
      name: String(name || ""),
      sector: String(sector || ""),
      type: String(type || ""),
    });
    return res.json(resRisks);
  }
}

export { GetRiskDetailsController };
