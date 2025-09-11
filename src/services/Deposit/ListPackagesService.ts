import prismaClient from "../../prisma";

class ListPackagesService {
  async execute() {
    const packages = await prismaClient.depositPackage.findMany({
      orderBy: {
        value: "desc",
      },
    });

    return packages;
  }
}

export { ListPackagesService };
