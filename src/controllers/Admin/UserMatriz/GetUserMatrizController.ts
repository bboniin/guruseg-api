import { Request, Response } from "express";
import { GetUserMatrizAdminService } from "../../../services/Admin/UserMatriz/GetUserMatrizAdminService";

class GetUserMatrizController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getUserMatrizAdminService = new GetUserMatrizAdminService();

    const user = await getUserMatrizAdminService.execute({
      id,
    });
    if (user) {
      if (user["photo"]) {
        user["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
      }
    }

    return res.json(user);
  }
}

export { GetUserMatrizController };
