import { Request, Response } from "express";
import { GetAdminResumeService } from "../../services/Resume/GetAdminResumeService";

class GetAdminResumeController {
  async handle(req: Request, res: Response) {
    const { start_date, end_date } = req.body;

    let userId = req.userId;

    const getAdminResumeService = new GetAdminResumeService();

    const resume = await getAdminResumeService.execute({
      start_date,
      end_date,
      userId,
    });

    return res.json(resume);
  }
}

export { GetAdminResumeController };
