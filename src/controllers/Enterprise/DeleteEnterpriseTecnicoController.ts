import { Request, Response } from "express";
import { DeleteEnterpriseTecnicoService } from "../../services/Enterprise/DeleteEnterpriseTecnicoService";

class DeleteEnterpriseTecnicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const userId = req.userId;

    const deleteEnterpriseTecnicoService = new DeleteEnterpriseTecnicoService();

    const enterprise = await deleteEnterpriseTecnicoService.execute({
      id,
      userId,
    });

    return res.json(enterprise);
  }
}

export { DeleteEnterpriseTecnicoController };
