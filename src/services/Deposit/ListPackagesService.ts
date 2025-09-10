import prismaClient from "../../prisma";

class ListPackagesService {
  async execute() {
    const packages = await prismaClient.depositPackage.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return packages;
  }
}

export { ListPackagesService };
