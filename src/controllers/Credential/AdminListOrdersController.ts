import { Request, Response } from "express";
import { AdminListCredentialsService } from "../../services/Credential/AdminListCredentialsService";

class AdminListCredentialsController {
  async handle(req: Request, res: Response) {
    let { page, filter } = req.query;

    const adminListCredentialsService = new AdminListCredentialsService();

    const credentials = await adminListCredentialsService.execute({
      filter: filter ? String(filter) : "",
      page: Number(page) > 0 ? Number(page) : 0,
    });

    return res.json(credentials);
  }
}

export { AdminListCredentialsController };
