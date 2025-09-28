import { Request, Response } from "express";
import { CreateDepositAdminService } from "../../services/Deposit/CreateDepositAdminService";

class CreateDepositAdminController {
  async handle(req: Request, res: Response) {
    const { value, bonus, collaborator_id, description, type } = req.body;

    let userId = req.userId;

    const createDepositAdminService = new CreateDepositAdminService();

    const deposit = await createDepositAdminService.execute({
      value,
      userId,
      collaborator_id,
      bonus,
      description,
      type,
    });

    return res.json(deposit);
  }
}

export { CreateDepositAdminController };
