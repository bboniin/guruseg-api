import { Request, Response } from "express";
import { EditAdminAssociateService } from "../../../services/Admin/Associates/EditAdminAssociateService";

class EditAdminAssociateController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      cnpj,
      phone_number,
      comission,
      city,
      state,
      cpf,
      user_id,
    } = req.body;

    const { id } = req.params;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const editAdminAssociateService = new EditAdminAssociateService();

    const associate = await editAdminAssociateService.execute({
      name,
      email,
      photo,
      password,
      id,
      cnpj,
      phone_number,
      comission: Number(comission),
      city,
      state,
      cpf,
      user_id,
    });

    if (associate["photo"]) {
      associate["photo_url"] =
        "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + associate["photo"];
    }

    return res.json(associate);
  }
}

export { EditAdminAssociateController };
