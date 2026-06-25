import { Request, Response } from "express";
import { SggSectorService } from "../../services/Company/SggSectorService";

class SggSectorController {
  async handle(req: Request, res: Response) {
    const { sgg_id } = req.body;

    const { sector_id } = req.params;

    const sggSectorService = new SggSectorService();

    const Sector = await sggSectorService.execute({
      sector_id: sector_id,
      sgg_id,
    });

    return res.json(Sector);
  }
}

export { SggSectorController };
