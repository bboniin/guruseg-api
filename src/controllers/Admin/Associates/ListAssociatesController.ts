import { Request, Response } from "express";
import { ListAssociatesService } from "../../../services/Admin/Associates/ListAssociatesService";

class ListAssociatesController {
  async handle(req: Request, res: Response) {
    const { filter, page, all } = req.query;

    const listAssociatesService = new ListAssociatesService();

    const associates = await listAssociatesService.execute({
      page: page ? Number(page) || 0 : 0,
      filter: filter ? String(filter) : "",
      all: all == "true",
    });

    associates.associates.map((item) => {
      if (item["photo"]) {
        item["photo_url"] =
          "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
      }
    });

    return res.json(associates);
  }
}

export { ListAssociatesController };
