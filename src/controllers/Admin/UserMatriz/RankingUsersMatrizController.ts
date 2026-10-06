import { Request, Response } from "express";
import { RankingUsersMatrizService } from "../../../services/Admin/UserMatriz/RankingUsersMatrizService";

class RankingUsersMatrizController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { date_start, date_end } = req.query;

    const rankingUsersMatrizService = new RankingUsersMatrizService();

    const users = await rankingUsersMatrizService.execute({
      userId,
      date_start: date_start ? String(date_start) : "",
      date_end: date_end ? String(date_end) : "",
    });

    return res.json(users);
  }
}

export { RankingUsersMatrizController };
