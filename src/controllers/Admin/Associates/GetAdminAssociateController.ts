import { Request, Response } from "express";
import { GetAdminAssociateService } from "../../../services/Admin/Associates/GetAdminAssociateService";

class GetAdminAssociateController {
  async handle(req: Request, res: Response) {
    let { id } = req.params;

    const getAdminAssociateService = new GetAdminAssociateService();

    const associate = await getAdminAssociateService.execute({
      id,
    });

    if (associate) {
      if (associate["photo"]) {
        associate["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" +
          associate["photo"];
      }
    }

    return res.json(associate);
  }
}

export { GetAdminAssociateController };
