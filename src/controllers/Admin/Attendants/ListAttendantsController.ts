import { Request, Response } from "express";
import { ListAttendantsService } from "../../../services/Admin/Attendants/ListAttendantsService";

class ListAttendantsController {
  async handle(req: Request, res: Response) {
    const { filter, page, all } = req.query;

    const listAttendantsService = new ListAttendantsService();

    const attendants = await listAttendantsService.execute({
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      all: all == "true",
    });

    return res.json(attendants);
  }
}

export { ListAttendantsController };
