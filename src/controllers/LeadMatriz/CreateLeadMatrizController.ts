import { Request, Response } from "express";
import { CreateLeadMatrizService } from "../../services/LeadMatriz/CreateLeadMatrizService";

class CreateLeadMatrizController {
  async handle(req: Request, res: Response) {
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

    const createLeadMatrizService = new CreateLeadMatrizService();

    const lead = await createLeadMatrizService.execute({
      name,
      email,
      phone_number,
      observation,
      employees,
      cnpj,
      value: value ? Number(value) : 0,
      price: price ? Number(price) : 0,
      necessity,
      location,
      status,
      tag,
      user_id: user_id || req.userId,
      contract_id,
    });

    return res.json(lead);
  }
}

export { CreateLeadMatrizController };
