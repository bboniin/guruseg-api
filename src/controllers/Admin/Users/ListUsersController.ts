import { Request, Response } from "express";
import { ListUsersService } from "../../../services/Admin/Users/ListUsersService";

class ListUsersController {
  async handle(req: Request, res: Response) {
    const { type } = req.params;

    let userId = req.userId;

    const { filter, page } = req.query;

    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute({
      userId,
      type,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      all: type == "all",
    });

    users.users.map((item) => {
      if (item["photo"]) {
        item["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });

    return res.json(users);
  }
}

export { ListUsersController };
