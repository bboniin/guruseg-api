import { Request, Response } from "express";
import { CreateDepositService } from "../../services/Deposit/CreateDepositService";

class CreateDepositController {
  async handle(req: Request, res: Response) {
    const { package_id, cpf } = req.body;

    let userId = req.userId;

    const createDepositService = new CreateDepositService();

    const deposit = await createDepositService.execute({
      package_id,
      userId,
      cpf,
    });

    return res.json(deposit);
  }
}

export { CreateDepositController };
