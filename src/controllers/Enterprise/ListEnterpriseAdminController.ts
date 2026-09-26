import { Request, Response } from "express";
import { ListEnterpriseAdminService } from "../../services/Enterprise/ListEnterpriseAdminService";

class ListEnterpriseAdminController {
  async handle(req: Request, res: Response) {
    const { user_id, search, type, page, all } = req.query;

    const listEnterpriseAdminService = new ListEnterpriseAdminService();

    const enterprises = await listEnterpriseAdminService.execute({
      user_id: user_id ? String(user_id) : undefined,
      search: search ? String(search) : undefined,
      type: type ? String(type) : undefined,
      page: page !== undefined ? Number(page) : undefined,
      all: all === "true" || all === "1",
    });

    return res.json(enterprises);
  }
}

export { ListEnterpriseAdminController };
