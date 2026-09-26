import prismaClient from "../../prisma";

interface CouponRequest {
  code: string;
  name: string;
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
    type,
    name,
    value,
    isSingleUse,
    expirationDate,
    usageLimit,
    minValue,
  }: CouponRequest) {
    if (!code || !type || !value) {
      throw new Error("Preencha o código, tipo e valor do cupom de desconto");
    }

    const coupon = await prismaClient.coupon.create({
      data: {
        code: code,
        name: name,
        value: value,
        type: type == "FIXED" ? "FIXED" : "PERCENTAGE",
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
