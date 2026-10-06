import { Request, Response } from "express";
import { GetUserService } from "../../services/User/GetUserService";

class GetUserController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const getUserService = new GetUserService();

    const user = await getUserService.execute({
      userId,
    });

    return res.json(user);
  }
}

export { GetUserController };
