import { Request, Response } from "express";
import { GetDepositService } from "../../services/Deposit/GetDepositService";

class GetDepositsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getDepositService = new GetDepositService();

    const deposits = await getDepositService.execute({
      id,
    });

    return res.json(deposits);
  }
}

export { GetDepositsController };
