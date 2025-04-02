import { endOfDay, isBefore } from "date-fns";
import prismaClient from "../../prisma";

interface CouponRequest {
  userId: string;
  code: string;
}

class GetCouponService {
  async execute({ userId, code }: CouponRequest) {
    const coupon = await prismaClient.coupon.findFirst({
      where: {
        code: code,
        active: true,
      },
      include: {
        redemptions: true,
      },
    });

    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }

    if (coupon.expirationDate) {
      if (isBefore(endOfDay(coupon.expirationDate), endOfDay(new Date()))) {
        throw new Error("Cupom de desconto expirado");
      }
    }

    if (coupon.isSingleUse) {
      const redemption = await prismaClient.redemption.findFirst({
        where: {
          couponId: coupon.id,
          userId: userId,
        },
      });

      if (redemption) {
        throw new Error("Cupom de desconto já foi utilizado");
      }
    }

    if (!!coupon.usageLimit && coupon.usageLimit <= coupon.redemptions.length) {
      throw new Error("Cupom de desconto esgotado");
    }

    return coupon;
  }
}

export { GetCouponService };
