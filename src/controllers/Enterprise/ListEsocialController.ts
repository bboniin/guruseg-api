import { Request, Response } from "express";
import { ListEsocialService } from "../../services/Enterprise/ListEsocialService";

class ListEsocialController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const listEsocialService = new ListEsocialService();

    const enterprises = await listEsocialService.execute({
      userId,
    });

    return res.json(enterprises);
  }
}

export { ListEsocialController };
