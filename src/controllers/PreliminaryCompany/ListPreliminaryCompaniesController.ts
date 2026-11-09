import { Request, Response } from "express";
import { ListPreliminaryCompaniesService } from "../../services/PreliminaryCompany/ListPreliminaryCompaniesService";

class ListPreliminaryCompaniesController {
  async handle(req: Request, res: Response) {
    const { status, search, page } = req.query;
    const userId = req.userId;

    const listService = new ListPreliminaryCompaniesService();
    const companies = await listService.execute({
      userId,
      status: status ? String(status) : "",
      search: search ? String(search) : "",
      page: Number(page) || 0,
    });

    return res.json(companies);
  }
}

export { ListPreliminaryCompaniesController };
