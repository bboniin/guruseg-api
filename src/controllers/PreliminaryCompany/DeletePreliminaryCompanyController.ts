import { Request, Response } from "express";
import { DeletePreliminaryCompanyService } from "../../services/PreliminaryCompany/DeletePreliminaryCompanyService";

class DeletePreliminaryCompanyController {
  async handle(req: Request, res: Response) {
    const company_id = req.params.company_id || req.params.id;
    const userId = req.userId;

    const deleteService = new DeletePreliminaryCompanyService();
    const result = await deleteService.execute({
      company_id,
      userId,
    });

    return res.json(result);
  }
}

export { DeletePreliminaryCompanyController };
