import { Request, Response } from "express";
import { ListServicesAdminService } from "../../services/Service/ListServicesAdminService";

class ListServicesAdminController {
  async handle(req: Request, res: Response) {
    let { page, search } = req.query;

    let userId = req.userId;

    const listServicesAdminService = new ListServicesAdminService();

    const services = await listServicesAdminService.execute({
      search: String(search) || "",
      page: Number(page) > 0 ? Number(page) : 0,
      userId,
    });

    return res.json(services);
  }
}

export { ListServicesAdminController };
