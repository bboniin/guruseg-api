import { Request, Response } from "express";
import { CreateLeadService } from "../../services/Lead/CreateLeadService";

class CreateLeadController {
  async handle(req: Request, res: Response) {
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

    let userId = req.userId;

    const createLeadService = new CreateLeadService();

    const lead = await createLeadService.execute({
      userId,
      name,
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

export { CreateLeadController };
