import { Request, Response } from "express";
import { EditLeadService } from "../../services/Lead/EditLeadService";

class EditLeadController {
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
    } = req.body;

    const editLeadService = new EditLeadService();

    const lead = await editLeadService.execute({
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
    });

    return res.json(lead);
  }
}

export { EditLeadController };
