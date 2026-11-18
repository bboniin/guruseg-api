import { Request, Response } from "express";
import { DeleteSSTDiagnosticService } from "../../services/SSTDiagnostic/DeleteSSTDiagnosticService";

class DeleteSSTDiagnosticController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const deleteService = new DeleteSSTDiagnosticService();
    const result = await deleteService.execute({
      id,
      userId,
    });

    return res.json(result);
  }
}

export { DeleteSSTDiagnosticController };
