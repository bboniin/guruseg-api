import { Request, Response } from "express";
import { EditCollaboratorOrderService } from "../../services/Order/EditCollaboratorOrderService";

class EditCollaboratorOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { collaborator_id } = req.body;

    let userId = req.userId;

    const editCollaboratorOrderService = new EditCollaboratorOrderService();

    const services = await editCollaboratorOrderService.execute({
      collaborator_id,
      userId,
      id: parseInt(id),
    });

    return res.json(services);
  }
}

export { EditCollaboratorOrderController };
