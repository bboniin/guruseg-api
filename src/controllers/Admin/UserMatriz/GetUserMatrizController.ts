import { Request, Response } from "express";
import { GetUserMatrizAdminService } from "../../../services/Admin/UserMatriz/GetUserMatrizAdminService";

class GetUserMatrizController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getUserMatrizAdminService = new GetUserMatrizAdminService();

    const user = await getUserMatrizAdminService.execute({
      id,
    });

    return res.json(user);
  }
}

export { GetUserMatrizController };
