import prismaClient from "../../prisma";

interface CouponRequest {
  userId: string;
}

class ListCouponsService {
  async execute({ userId }: CouponRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    const coupons = await prismaClient.coupon.findMany({
      orderBy: {
        create_at: "asc",
      },
    });

    return coupons;
  }
}

export { ListCouponsService };
