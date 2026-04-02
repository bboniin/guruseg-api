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

    if (resume.associate) {
      if (resume.associate["photo"]) {
        resume.associate["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" +
          resume.associate["photo"];
      }
    }

    return res.json(resume);
  }
}

export { ResumeAdminAssociateController };
