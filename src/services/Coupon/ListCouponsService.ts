import prismaClient from "../../prisma";

interface CouponRequest {
  filter: string;
  page: number;
}

class ListCouponsService {
  async execute({ page, filter }: CouponRequest) {
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
