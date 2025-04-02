import { Request, Response } from "express";
import { EditCouponService } from "../../services/Coupon/EditCouponService";

class EditCouponController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

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

    let userId = req.userId;

    const editCouponService = new EditCouponService();

    const coupon = await editCouponService.execute({
      name,
      value,
      expirationDate,
      minValue,
      type,
      isSingleUse,
      code,
      usageLimit,
      userId,
      id,
    });

    return res.json(coupon);
  }
}

export { EditCouponController };
