import { Request, Response } from "express";
import { ListPackagesService } from "../../services/Deposit/ListPackagesService";

class ListPackagesController {
  async handle(req: Request, res: Response) {
    const listPackagesService = new ListPackagesService();

    const packages = await listPackagesService.execute();

    return res.json(packages);
  }
}

export { ListPackagesController };
