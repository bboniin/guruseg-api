import { Request, Response } from "express";
import { GetDepositService } from "../../services/Deposit/GetDepositService";

class GetDepositsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const getDepositService = new GetDepositService();

    const deposits = await getDepositService.execute({
      userId,
      id,
    });

    return res.json(deposits);
  }
}

export { GetDepositsController };
