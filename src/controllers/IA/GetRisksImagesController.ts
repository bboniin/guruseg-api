import { Request, Response } from "express";
import { GetRisksImagesService } from "../../services/IA/GetRisksImagesService";

class GetRisksImagesController {
  async handle(req: Request, res: Response) {
    const { occupations, sector, description, images } = req.query;

    const getRisksImagesService = new GetRisksImagesService();

    const resRisks = await getRisksImagesService.execute({
      occupations: String(occupations || ""),
      sector: String(sector || ""),
      images: String(images || ""),
      description: String(description || ""),
    });
    return res.json(resRisks);
  }
}

export { GetRisksImagesController };
