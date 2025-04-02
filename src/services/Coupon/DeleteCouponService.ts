import prismaClient from "../../prisma";

interface CouponRequest {
  userId: string;
  id: string;
}

class DeleteCouponService {
  async execute({ userId, id }: CouponRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const coupon = await prismaClient.coupon.findFirst({
      where: {
        code: id,
        active: true,
      },
      include: {
        redemptions: true,
      },
    });

    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }

    const couponDel = await prismaClient.coupon.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });

    return couponDel;
  }
}

export { DeleteCouponService };
