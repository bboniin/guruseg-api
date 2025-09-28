import { Request, Response } from "express";
import { GetUserResumeService } from "../../services/Resume/GetUserResumeService";

class GetUserResumeController {
  async handle(req: Request, res: Response) {
    const { start_date, end_date } = req.body;

    let userId = req.userId;

    const getUserResumeService = new GetUserResumeService();

    const resume = await getUserResumeService.execute({
      start_date,
      end_date,
      userId,
    });

    return res.json(resume);
  }
}

export { GetUserResumeController };
