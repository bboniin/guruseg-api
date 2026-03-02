import { Request, Response } from "express";
import { GetLeadMasterService } from "../../services/Lead/GetLeadMasterService";

class GetLeadMasterController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getLeadMasterService = new GetLeadMasterService();

    const lead = await getLeadMasterService.execute({
      id,
    });

    return res.json(lead);
  }
}

export { GetLeadMasterController };
