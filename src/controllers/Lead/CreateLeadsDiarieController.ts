import { Request, Response } from "express";
import { CreateLeadsDiarieService } from "../../services/Lead/CreateLeadsDiarieService";

class CreateLeadsDiarieController {
  async handle(req: Request, res: Response) {
    const createLeadsDiarieService = new CreateLeadsDiarieService();

    const lead = await createLeadsDiarieService.execute();

    return res.json(lead);
  }
}

export { CreateLeadsDiarieController };
