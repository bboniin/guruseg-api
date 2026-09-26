import prismaClient from "../../../prisma";

class ListBannersService {
  async execute() {
    const banners = await prismaClient.banner.findMany();

    return banners;
  }
}

export { ListBannersService };
