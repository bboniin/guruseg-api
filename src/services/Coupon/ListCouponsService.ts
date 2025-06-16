import prismaClient from "../../prisma";

interface CouponRequest {
  userId: string;
  filter: string;
  page: number;
}

class ListCouponsService {
  async execute({ userId, page, filter }: CouponRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    let filterWhere = {};

    if (filter) {
      filterWhere["name"] = {
        contains: filter,
        mode: "insensitive",
      };
      filterWhere["code"] = {
        contains: filter,
        mode: "insensitive",
      };
    }

    const couponsTotal = await prismaClient.coupon.count({
      where: filterWhere,
    });

    const coupons = await prismaClient.coupon.findMany({
      where: filterWhere,
      orderBy: {
        create_at: "asc",
      },
      skip: page * 30,
      take: 30,
    });

    return { coupons, couponsTotal };
  }
}

export { ListCouponsService };
