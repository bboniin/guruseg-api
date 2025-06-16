import { Request, Response } from "express";
import { ListCompaniesService } from "../../services/Company/ListCompaniesService";

class ListCompaniesController {
  async handle(req: Request, res: Response) {
    const { status, search, page } = req.query;

    let userId = req.userId;

    const listCompaniesService = new ListCompaniesService();

    const companies = await listCompaniesService.execute({
      userId,
      status: status ? String(status) : "",
      search: search ? String(search) : "",
      page: Number(page) || 0,
    });

    return res.json(companies);
  }
}

export { ListCompaniesController };
