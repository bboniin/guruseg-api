import { Request, Response } from "express";
import { ListAttendantsService } from "../../../services/Admin/Attendants/ListAttendantsService";

class ListAttendantsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const { filter, page, all } = req.query;

    const listAttendantsService = new ListAttendantsService();

    const attendants = await listAttendantsService.execute({
      userId,
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      all: all == "true",
    });

    attendants.attendants.map((item) => {
      if (item["photo"]) {
        item["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });

    return res.json(attendants);
  }
}

export { ListAttendantsController };
