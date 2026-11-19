import { Request, Response } from "express";
import { CreateSSTDiagnosticService } from "../../services/SSTDiagnostic/CreateSSTDiagnosticService";

class CreateSSTDiagnosticController {
  async handle(req: Request, res: Response) {
    const {
      company_name,
      employees_count,
      assessment_date,
      franchisee_name,
      franchisee_phone,
      franchisee_email,
      answers,
      stats,
      cost,
    } = req.body;

    const userId = req.userId;

    const createService = new CreateSSTDiagnosticService();
    const result = await createService.execute({
      userId,
      company_name,
      employees_count,
      assessment_date,
      franchisee_name,
      franchisee_phone,
      franchisee_email,
      answers,
      stats,
      cost,
    });

    return res.status(201).json(result);
  }
}

export { CreateSSTDiagnosticController };
