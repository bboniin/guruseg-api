import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

class ListBannersService {
  async execute() {
    const banners = await prismaClient.banner.findMany();

    const s3Storage = new S3Storage();
    const bannersWithUrl = await Promise.all(
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

    return bannersWithUrl;
  }
}

export { ListBannersService };
