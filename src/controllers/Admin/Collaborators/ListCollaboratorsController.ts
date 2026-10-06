import { Request, Response } from "express";
import { ListCollaboratorsService } from "../../../services/Admin/Collaborators/ListCollaboratorsService";

class ListCollaboratorsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { filter, page, all } = req.query;

    const listCollaboratorsService = new ListCollaboratorsService();

    const collaborators = await listCollaboratorsService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      all: all == "true",
    });

    return res.json(collaborators);
  }
}

export { ListCollaboratorsController };
