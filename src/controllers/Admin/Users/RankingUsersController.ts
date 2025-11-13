import { Request, Response } from "express";
import { RankingUsersService } from "../../../services/Admin/Users/RankingUsersService";

class RankingUsersController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { date_start, date_end } = req.query;

    const rankingUsersService = new RankingUsersService();

    const users = await rankingUsersService.execute({
      userId,
      date_start: date_start ? String(date_start) : "",
      date_end: date_end ? String(date_end) : "",
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

export { RankingUsersController };
