import { Request, Response } from "express";
import { ListCouponsService } from "../../services/Coupon/ListCouponsService";

class ListCouponsController {
  async handle(req: Request, res: Response) {
    let userId = req.userId;

    const listCouponsService = new ListCouponsService();

    const coupons = await listCouponsService.execute({
      userId: userId,
    });

    return res.json(coupons);
  }
}

export { ListCouponsController };
