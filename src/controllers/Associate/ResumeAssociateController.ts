import { Request, Response } from "express";
import { ResumeAssociateService } from "../../services/Associate/ResumeAssociateService";

class ResumeAssociateController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;

    const { startDate, endDate } = req.query;

    const resumeAssociateService = new ResumeAssociateService();

    const resume = await resumeAssociateService.execute({
      userId,
      endDate: endDate ? String(endDate) : "",
      startDate: startDate ? String(startDate) : "",
    });

    return res.json(resume);
  }
}

export { ResumeAssociateController };
