import { Request, Response } from "express";
import { ListSSTDiagnosticsService } from "../../services/SSTDiagnostic/ListSSTDiagnosticsService";

class ListSSTDiagnosticsController {
  async handle(req: Request, res: Response) {
    const { search, page, all } = req.query;
    const userId = req.userId;

    const listService = new ListSSTDiagnosticsService();
    const result = await listService.execute({
      userId,
      search: search ? String(search) : undefined,
      page: page !== undefined ? Number(page) : 0,
      all: String(all) === "true",
    });

    return res.json(result);
  }
}

export { ListSSTDiagnosticsController };
