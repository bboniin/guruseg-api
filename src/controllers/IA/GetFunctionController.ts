import { Request, Response } from "express";
import { GetOccupationalService } from "../../services/IA/GetOccupationalService";

class GetOccupationalController {
  async handle(req: Request, res: Response) {
    const { name } = req.query;

    const getOccupationalService = new GetOccupationalService();

    const resOccupational = await getOccupationalService.execute({
      name: String(name || ""),
    });
    return res.json(resOccupational);
  }
}

export { GetOccupationalController };
