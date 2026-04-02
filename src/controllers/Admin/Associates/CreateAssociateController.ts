import { Request, Response } from "express";
import { CreateAssociateService } from "../../../services/Admin/Associates/CreateAssociateService";

class CreateAssociateController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      cnpj,
      cpf,
      phone_number,
      comission,
      city,
      state,
      user_id,
    } = req.body;

    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }

    const createAssociateService = new CreateAssociateService();

    const associate = await createAssociateService.execute({
      name,
      email,
      password,
      photo,
      cnpj,
      cpf,
      phone_number,
      comission: Number(comission),
      city,
      state,
      user_id,
    });

    return res.json(associate);
  }
}

export { CreateAssociateController };
