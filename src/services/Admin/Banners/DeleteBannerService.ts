import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface BannerRequest {
  id: string;
}

class DeleteBannerService {
  async execute({ id }: BannerRequest) {
    const banner = await prismaClient.banner.findUnique({
      where: {
        id: id,
      },
    });

    if (banner["photo"]) {
      const s3Storage = new S3Storage();
      await s3Storage.deleteFile(banner["photo"]);
    }

    const banners = await prismaClient.banner.delete({
      where: {
        id: id,
      },
    });

    return banners;
  }
}

export { DeleteBannerService };
