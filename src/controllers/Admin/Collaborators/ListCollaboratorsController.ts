import { Request, Response } from "express";
import { ListCollaboratorsService } from "../../../services/Admin/Collaborators/ListCollaboratorsService";

class ListCollaboratorsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { filter, page } = req.query;

    const listCollaboratorsService = new ListCollaboratorsService();

    const collaborators = await listCollaboratorsService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
    });

    collaborators.collaborators.map((item) => {
      if (item["photo"]) {
        item["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });

    return res.json(collaborators);
  }
}

export { ListCollaboratorsController };
