import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface BannerRequest {
  photo: string;
  url: string;
  id: string;
  types: string;
}

class EditBannerService {
  async execute({ url, types, photo, id }: BannerRequest) {
    const banner = await prismaClient.banner.findUnique({
      where: {
        id: id,
      },
    });

    if (!url) {
      throw new Error("Preencha a Url do banner");
    }

    if (!types) {
      throw new Error("Preencha os visualizadores do banner");
    }

    if (!banner) {
      throw new Error("Banner não existe");
    }

    let data = {
      url: url,
      types: types,
    };

    if (photo) {
      const s3Storage = new S3Storage();

      if (banner["photo"]) {
        await s3Storage.deleteFile(banner["photo"]);
      }

      const upload = await s3Storage.saveFile(photo);

      data["photo"] = upload;
    }

    const bannerRes = await prismaClient.banner.update({
      where: {
        id: id,
      },
      data: data,
    });

    const s3Storage = new S3Storage();
    if (bannerRes.photo) {
      bannerRes["photo_url"] = await s3Storage.getTemporaryUrl(
        bannerRes.photo,
        245,
      );
    }

    return bannerRes;
  }
}

export { EditBannerService };
