import { Request, Response } from "express";
import { ListStatementsService } from "../../services/Statement/ListStatementsService";

class ListStatementsController {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    const listStatementsService = new ListStatementsService();

    const statements = await listStatementsService.execute({
      page: Number(page) || 0,
    });

    return res.json(statements);
  }
}

export { ListStatementsController };
