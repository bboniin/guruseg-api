import { Request, Response } from "express";
import { GetPreliminaryCompanyService } from "../../services/PreliminaryCompany/GetPreliminaryCompanyService";

class GetPreliminaryCompanyController {
  async handle(req: Request, res: Response) {
    const company_id = req.params.company_id || req.params.id;

    const getService = new GetPreliminaryCompanyService();
    const result = await getService.execute({ company_id });

    return res.json(result);
  }
}

export { GetPreliminaryCompanyController };
