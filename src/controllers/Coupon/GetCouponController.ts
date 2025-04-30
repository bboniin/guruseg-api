import { Request, Response } from "express";
import { GetCouponService } from "../../services/Coupon/GetCouponService";

class GetCouponController {
  async handle(req: Request, res: Response) {
    const { code, value } = req.body;

    let userId = req.userId;

    const getCouponService = new GetCouponService();

    const coupon = await getCouponService.execute({
      userId,
      value,
      code,
    });

    return res.json(coupon);
  }
}

export { GetCouponController };
