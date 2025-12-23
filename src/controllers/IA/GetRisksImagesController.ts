import { Request, Response } from "express";
import { GetRisksImagesService } from "../../services/IA/GetRisksImagesService";

class GetRisksImagesController {
  async handle(req: Request, res: Response) {
    const { images } = req.query;

    const getRisksImagesService = new GetRisksImagesService();

    const resRisks = await getRisksImagesService.execute({
      images: String(images || ""),
    });
    return res.json(resRisks);
  }
}

export { GetRisksImagesController };
