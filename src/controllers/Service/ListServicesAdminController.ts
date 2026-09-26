import { Request, Response } from "express";
import { ListServicesAdminService } from "../../services/Service/ListServicesAdminService";

class ListServicesAdminController {
  async handle(req: Request, res: Response) {
    let { page, search, all } = req.query;

    const listServicesAdminService = new ListServicesAdminService();

    const services = await listServicesAdminService.execute({
      search: search ? String(search) : "",
      page: Number(page) > 0 ? Number(page) : 0,
      all: all == "true",
    });

    return res.json(services);
  }
}

export { ListServicesAdminController };
