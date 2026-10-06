import { Request, Response } from "express";
import { ResumeAdminAssociateService } from "../../../services/Admin/Associates/ResumeAdminAssociateService";

class ResumeAdminAssociateController {
  async handle(req: Request, res: Response) {
    const { associate_id } = req.params;

    const { startDate, endDate } = req.query;

    const resumeAdminAssociateService = new ResumeAdminAssociateService();

    const resume = await resumeAdminAssociateService.execute({
      associate_id,
      endDate: endDate ? String(endDate) : "",
      startDate: startDate ? String(startDate) : "",
    });

    return res.json(resume);
  }
}

export { ResumeAdminAssociateController };
