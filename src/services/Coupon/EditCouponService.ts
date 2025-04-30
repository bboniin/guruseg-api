import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface CouponRequest {
  id: string;
  code: string;
  name: string;
  userId: string;
  value: number;
  type: string;
  minValue: number;
  usageLimit: number;
  isSingleUse: boolean;
  active: boolean;
  expirationDate: Date;
}
class EditCouponService {
  async execute({
    id,
    code,
    userId,
    type,
    name,
    value,
    isSingleUse,
    expirationDate,
    usageLimit,
    active,
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

    const coupon = await prismaClient.coupon.findUnique({
      where: {
        id: id,
      },
    });

    if (!coupon) {
      throw new Error("Cupom de desconto não encontrado");
    }

    if (!code || !type || !value) {
      throw new Error("Preencha o código, tipo e valor do cupom de desconto");
    }

    const couponRes = await prismaClient.coupon.update({
      where: {
        id: id,
      },
      data: {
        code: code,
        name: name,
        value: value,
        type: type == "FIXED" ? "FIXED" : "PERCENTAGE",
        isSingleUse: isSingleUse,
        active: active,
        minValue: minValue || 0,
        usageLimit: usageLimit || 0,
        expirationDate: expirationDate || null,
      },
    });

    return couponRes;
  }
}

export { EditCouponService };
