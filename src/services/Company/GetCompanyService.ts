import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface CompanyRequest {
  company_id: string;
}

class GetCompanyService {
  async execute({ company_id }: CompanyRequest) {
    const company = await prismaClient.company.findUnique({
      where: {
        id: company_id,
      },
      include: {
        companySector: {
          orderBy: {
            create_at: "asc",
          },
          include: {
            companyEmployees: {
              orderBy: {
                create_at: "asc",
              },
            },
            companyScratchs: {
              orderBy: {
                create_at: "asc",
              },
            },
          },
        },
      },
    });

    const images = await prismaClient.companyImages.findMany({
      where: {
        company_id: company_id,
        index: {
          lt: company.companySector.length,
        },
      },
    });

    let companyImages = [];
    for (let i = 0; i < company.companySector.length; i++) {
      companyImages.push([]);
    }
    const s3Storage = new S3Storage();
    await Promise.all(
      images.map(async (item) => {
        item["photo_url"] = await s3Storage.getTemporaryUrl(item.photo, 245);
        companyImages[item.index].push(item);
      }),
    );
    return { ...company, companyImages: companyImages };
  }
}

export { GetCompanyService };
