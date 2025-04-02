import prismaClient from "../../prisma";

interface CouponRequest {
  code: string;
  name: string;
  userId: string;
  value: number;
  type: string;
  minValue: number;
  usageLimit: number;
  isSingleUse: boolean;
  expirationDate: Date;
}

class CreateCouponService {
  async execute({
    code,
    userId,
    type,
    name,
    value,
    isSingleUse,
    expirationDate,
    usageLimit,
    minValue,
  }: CouponRequest) {
    const admin = await prismaClient.admin.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin) {
      throw new Error("Rota restrita ao administrador");
    }

    if (!code || !type || !value) {
      throw new Error("Preencha o código, tipo e valor do cupom de desconto");
    }

    const coupon = await prismaClient.coupon.create({
      data: {
        code: code,
        name: name,
        value: value,
        type: type == "fixed" ? "FIXED" : "PERCENTAGE",
        isSingleUse: isSingleUse,
        minValue: minValue || 0,
        usageLimit: usageLimit || 0,
        expirationDate: expirationDate || null,
      },
    });

    return coupon;
  }
}

export { CreateCouponService };
