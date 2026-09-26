import prismaClient from "../../prisma";

interface CouponRequest {
  id: string;
}

class DeleteCouponService {
  async execute({ id }: CouponRequest) {
    const coupon = await prismaClient.coupon.findUnique({
      where: {
        id: id,
      },
      include: {
        redemptions: true,
      },
    });

    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }

    const couponDel = await prismaClient.coupon.delete({
      where: {
        id: id,
      },
    });

    return couponDel;
  }
}

export { DeleteCouponService };
