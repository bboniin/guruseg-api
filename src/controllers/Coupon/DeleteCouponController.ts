import { Request, Response } from "express";
import { DeleteCouponService } from "../../services/Coupon/DeleteCouponService";

class DeleteCouponController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const deleteCouponService = new DeleteCouponService();

    const coupon = await deleteCouponService.execute({
      id,
      userId,
    });

    return res.json(coupon);
  }
}

export { DeleteCouponController };
