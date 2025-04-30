import { endOfDay, isBefore } from "date-fns";
import prismaClient from "../../prisma";
import { getValue } from "../../config/functions";

interface CouponRequest {
  userId: string;
  value: number;
  code: string;
}

class GetCouponService {
  async execute({ userId, code, value }: CouponRequest) {
    const coupon = await prismaClient.coupon.findFirst({
      where: {
        code: { equals: code, mode: "insensitive" },
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

    if (value < coupon.minValue) {
      throw new Error(
        `Valor mínimo para resgatar esse cupom é de ${getValue(
          coupon.minValue
        )}`
      );
    }

    return coupon;
  }
}

export { GetCouponService };
