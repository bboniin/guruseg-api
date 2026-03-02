import { Request, Response } from "express";
import { DeleteManyLeadsMasterService } from "../../services/Lead/DeleteManyLeadsMasterService";

class DeleteManyLeadsMasterController {
  async handle(req: Request, res: Response) {
    const deleteManyLeadsMasterService = new DeleteManyLeadsMasterService();

    const lead = await deleteManyLeadsMasterService.execute();

    return res.json(lead);
  }
}

export { DeleteManyLeadsMasterController };
