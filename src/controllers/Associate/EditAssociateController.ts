import { Request, Response } from "express";
import { EditAssociateService } from "../../services/Associate/EditAssociateService";

class EditAssociateController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      phone_number,
      cnpj,
      type_pix,
      key_pix,
      cpf,
      comission,
      city,
      state,
      password,
      terms_accepted,
    } = req.body;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    let associateId = req.userId;

    const editAssociateService = new EditAssociateService();

    const associate = await editAssociateService.execute({
      name,
      email,
      phone_number,
      photo,
      associateId,
      cnpj,
      comission,
      city,
      state,
      cpf,
      type_pix,
      key_pix,
      password,
      terms_accepted,
    });

    if (associate) {
      if (associate["photo"]) {
        associate["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" +
          associate["photo"];
      }
    }

    return res.json({
      id: associate.id,
      email: associate.email,
      name: associate.name,
      photo: associate.photo,
      phone_number: associate.phone_number,
      comission: associate.comission,
      state: associate.state,
      city: associate.city,
      photo_url: associate["photo_url"],
      type: associate.type,
      cpf: associate.cpf,
      terms_accepted: associate.terms_accepted,
      type_pix: associate.type_pix,
      key_pix: associate.key_pix,
    });
  }
}

export { EditAssociateController };
