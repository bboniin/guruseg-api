import { Request, Response } from "express";
import { ListAdminsService } from "../../../services/Admin/Admins/ListAdminsService";

class ListAdminsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { filter, page } = req.query;

    const listadminsService = new ListAdminsService();

    const admins = await listadminsService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
    });

    admins.admins.map((item) => {
      if (item["photo"]) {
        item["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });

    return res.json(admins);
  }
}

export { ListAdminsController };
