import { Request, Response } from "express";
import { CreateAssociateWebService } from "../../../services/Admin/Associates/CreateAssociateWebService";

class CreateAssociateWebController {
  async handle(req: Request, res: Response) {
    const { name, email, phone_number, accounting_name, city, state } =
      req.body;

    const createAssociateWebService = new CreateAssociateWebService();

    const associate = await createAssociateWebService.execute({
      name,
      email,
      phone_number,
      accounting_name,
      city,
      state,
    });

    return res.json(associate);
  }
}

export { CreateAssociateWebController };
