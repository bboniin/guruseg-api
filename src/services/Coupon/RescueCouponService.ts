import { getValue } from "../../config/functions";
import prismaClient from "../../prisma";

interface CouponRequest {
  userId: string;
  coupon: object;
  orderId: number;
  value: number;
}

class RescueCouponService {
  async execute({ userId, coupon, orderId, value }: CouponRequest) {
    if (!userId || !coupon || !orderId) {
      throw new Error("Id do usuário, cupom e OS são obrigátorios");
    }

    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }

    const redemptionOS = await prismaClient.redemption.findFirst({
      where: {
        id: coupon["id"],
        orderId: orderId,
      },
    });

    if (redemptionOS) {
      throw new Error("OS já tem cupom de desconto");
    }

    const redemption = await prismaClient.redemption.create({
      data: {
        name: `${coupon["name"]} - ${
          coupon["type"] == "FIXED"
            ? `${getValue(coupon["value"] || 0)} OFF`
            : `${coupon["value"]}%`
        }`,
        value: value,
        couponId: coupon["id"],
        orderId: orderId,
        userId: userId,
      },
    });

    return redemption;
  }
}

export { RescueCouponService };
