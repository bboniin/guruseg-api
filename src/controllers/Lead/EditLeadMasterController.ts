import { Request, Response } from "express";
import { EditLeadMasterService } from "../../services/Lead/EditLeadMasterService";

class EditLeadMasterController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      observation,
      email,
      location,
      cnpj,
      necessity,
      phone_number,
      employees,
      value,
      price,
    } = req.body;

    const editLeadMasterService = new EditLeadMasterService();

    const lead = await editLeadMasterService.execute({
      name,
      id,
      observation,
      email,
      location,
      cnpj,
      necessity,
      phone_number,
      employees,
      value,
      price,
    });

    return res.json(lead);
  }
}

export { EditLeadMasterController };
