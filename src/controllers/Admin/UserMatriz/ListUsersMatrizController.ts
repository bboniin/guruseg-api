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

    users.users.map((item) => {
      if (item["photo"]) {
        item["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });

    return res.json(users);
  }
}

export { ListUsersMatrizController };
