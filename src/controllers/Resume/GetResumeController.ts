import { Request, Response } from "express";
import { GetResumeService } from "../../services/Resume/GetResumeService";

class GetResumeController {
  async handle(req: Request, res: Response) {
    const { start_date, end_date } = req.body;

    let userId = req.userId;

    const getResumeService = new GetResumeService();

    const resume = await getResumeService.execute({
      start_date,
      end_date,
      userId,
    });

    return res.json(resume);
  }
}

export { GetResumeController };
