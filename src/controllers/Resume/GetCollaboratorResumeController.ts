import { Request, Response } from "express";
import { GetCollaboratorResumeService } from "../../services/Resume/GetCollaboratorResumeService";

class GetCollaboratorResumeController {
  async handle(req: Request, res: Response) {
    const { start_date, end_date } = req.body;

    let userId = req.userId;

    const getCollaboratorResumeService = new GetCollaboratorResumeService();

    const resume = await getCollaboratorResumeService.execute({
      start_date,
      end_date,
      userId,
    });

    return res.json(resume);
  }
}

export { GetCollaboratorResumeController };
