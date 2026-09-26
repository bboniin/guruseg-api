import { Request, Response } from "express";
import { DeleteUserMatrizService } from "../../../services/Admin/UserMatriz/DeleteUserMatrizService";

class DeleteUserMatrizController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUserMatrizService = new DeleteUserMatrizService();

    const user = await deleteUserMatrizService.execute({
      id,
    });

    return res.json(user);
  }
}

export { DeleteUserMatrizController };
