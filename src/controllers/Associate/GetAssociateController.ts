import { Request, Response } from "express";
import { GetAssociateService } from "../../services/Associate/GetAssociateService";

class GetAssociateController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const getAssociateService = new GetAssociateService();

    const associate = await getAssociateService.execute({
      userId,
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

export { GetAssociateController };
