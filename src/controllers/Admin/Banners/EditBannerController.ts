import { Request, Response } from "express";
import { EditBannerService } from "../../../services/Admin/Banners/EditBannerService";

class EditBannerController {
  async handle(req: Request, res: Response) {
    const { url, types } = req.body;

    const { id } = req.params;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const editBannerService = new EditBannerService();

    const banner = await editBannerService.execute({
      url,
      types,
      photo,
      id,
    });

    return res.json(banner);
  }
}

export { EditBannerController };
