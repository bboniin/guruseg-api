import { Request, Response } from "express";
import { GetUserAdminService } from "../../../services/Admin/Users/GetUserAdminService";

class GetUserAdminController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getUserAdminService = new GetUserAdminService();

    const user = await getUserAdminService.execute({
      id,
    });

    return res.json(user);
  }
}

export { GetUserAdminController };
