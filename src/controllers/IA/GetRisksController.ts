import { Request, Response } from "express";
import { GetRisksService } from "../../services/IA/GetRisksService";

class GetRisksController {
  async handle(req: Request, res: Response) {
    const { occupations, sector, description } = req.query;

    const getRisksService = new GetRisksService();

    const resRisks = await getRisksService.execute({
      occupations: String(occupations || ""),
      sector: String(sector || ""),
      description: String(description || ""),
    });
    return res.json(resRisks);
  }
}

export { GetRisksController };
