import { Request, Response } from "express";
import { LastStatementsUserService } from "../../services/Statement/LastStatementsUserService";

class LastStatementsUserController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const lastStatementsUserService = new LastStatementsUserService();

    const statements = await lastStatementsUserService.execute({
      userId: userId,
    });

    return res.json(statements);
  }
}

export { LastStatementsUserController };
