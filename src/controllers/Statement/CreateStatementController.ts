import { Request, Response } from "express";
import { CreateStatementService } from "../../services/Statement/CreateStatementService";

class CreateStatementController {
  async handle(req: Request, res: Response) {
    const { title, description } = req.body;

    const createStatementService = new CreateStatementService();

    const statement = await createStatementService.execute({
      title,
      description,
    });

    return res.json(statement);
  }
}

export { CreateStatementController };
