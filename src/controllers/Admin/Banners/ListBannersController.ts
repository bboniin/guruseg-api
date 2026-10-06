import { Request, Response } from "express";
import { ListBannersService } from "../../../services/Admin/Banners/ListBannersService";

class ListBannersController {
  async handle(req: Request, res: Response) {
    const listBannersService = new ListBannersService();

    const banners = await listBannersService.execute();

    return res.json(banners);
  }
}

export { ListBannersController };
