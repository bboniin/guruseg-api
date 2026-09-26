import { Request, Response } from "express";
import { EditLeadMatrizService } from "../../services/LeadMatriz/EditLeadMatrizService";

class EditLeadMatrizController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      email,
      phone_number,
      observation,
      employees,
      cnpj,
      value,
      price,
      necessity,
      location,
      status,
      tag,
      user_id,
      contract_id,
    } = req.body;

    const leadId = id || req.body.id;

    const editLeadMatrizService = new EditLeadMatrizService();

    const lead = await editLeadMatrizService.execute({
      id: leadId,
      name,
      email,
      phone_number,
      observation,
      employees,
      cnpj,
      value: value !== undefined ? Number(value) : undefined,
      price: price !== undefined ? Number(price) : undefined,
      necessity,
      location,
      status,
      tag,
      user_id,
      contract_id,
    });

    return res.json(lead);
  }
}

export { EditLeadMatrizController };
