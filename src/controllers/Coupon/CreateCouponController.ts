import { Request, Response } from "express";
import { CreateCouponService } from "../../services/Coupon/CreateCouponService";

class CreateCouponController {
  async handle(req: Request, res: Response) {
    const {
      name,
      value,
      expirationDate,
      minValue,
      type,
      isSingleUse,
      code,
      usageLimit,
    } = req.body;

    const createCouponService = new CreateCouponService();

    const coupon = await createCouponService.execute({
      name,
      value,
      expirationDate,
      minValue,
      type,
      isSingleUse,
      code,
      usageLimit,
    });

    return res.json(coupon);
  }
}

export { CreateCouponController };
