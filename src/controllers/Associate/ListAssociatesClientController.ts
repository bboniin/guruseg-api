import { Request, Response } from "express";
import { ListAssociatesClientService } from "../../services/Associate/ListAssociatesClientService";

class ListAssociatesClientController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const listAssociatesClientService = new ListAssociatesClientService();

    const associates = await listAssociatesClientService.execute({
      userId,
    });

    return res.json(associates);
  }
}

export { ListAssociatesClientController };
