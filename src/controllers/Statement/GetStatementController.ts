import { Request, Response } from "express";
import { GetStatementService } from "../../services/Statement/GetStatementService";

class GetStatementController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getStatementService = new GetStatementService();

    const statement = await getStatementService.execute({
      id,
    });

    return res.json(statement);
  }
}

export { GetStatementController };
