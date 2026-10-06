import { Request, Response } from "express";
import { ListUsersMatrizService } from "../../../services/Admin/UserMatriz/ListUsersMatrizService";

class ListUsersMatrizController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { filter, page, all, type } = req.query;

    const listUsersMatrizService = new ListUsersMatrizService();

    const users = await listUsersMatrizService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      type: type ? String(type) : "",
      all: all == "true",
    });

    return res.json(users);
  }
}

export { ListUsersMatrizController };
