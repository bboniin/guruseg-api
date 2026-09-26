import { Request, Response } from "express";
import { ListCouponsService } from "../../services/Coupon/ListCouponsService";

class ListCouponsController {
  async handle(req: Request, res: Response) {
    const { page, filter } = req.query;

    const listCouponsService = new ListCouponsService();

    const coupons = await listCouponsService.execute({
      filter: filter ? String(filter) : "",
      page: Number(page) || 0,
    });

    return res.json(coupons);
  }
}

export { ListCouponsController };
