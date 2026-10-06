import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface BannerRequest {
  type: string;
}

class ListBannersPublicService {
  async execute({ type }: BannerRequest) {
    const banners = await prismaClient.banner.findMany({
      where: {
        types: {
          contains: type,
        },
      },
      select: {
        photo: true,
        url: true,
      },
    });
    const s3Storage = new S3Storage();
    const bannersResponse = await Promise.all(
      banners.map(async (banner) => {
        if (banner.photo) {
          banner["photo_url"] = await s3Storage.getTemporaryUrl(
            banner.photo,
            245,
          );
        }

        return banner;
      }),
    );
    return bannersResponse;
  }
}

export { ListBannersPublicService };
