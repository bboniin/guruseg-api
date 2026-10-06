import { Request, Response } from "express";
import { ListUsersService } from "../../../services/Admin/Users/ListUsersService";

class ListUsersController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { filter, page, all, type } = req.query;

    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      type: type ? String(type) : "",
      all: all == "true",
    });

    return res.json(users);
  }
}

export { ListUsersController };
