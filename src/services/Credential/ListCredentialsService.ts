import prismaClient from "../../prisma";
import S3Storage from "../../utils/S3Storage";

interface CredentialRequest {
  state: string;
  city: string;
  service: string;
  page: number;
}

class ListCredentialsService {
  async execute({ state, city, service, page }: CredentialRequest) {
    let filter = {
      enabled: true,
      visible: true,
    };

    if (state) {
      filter["OR"] = [
        {
          state: state,
        },
        {
          served_cities: { contains: state },
        },
      ];
    }

    if (city) {
      filter["OR"] = [
        {
          AND: [
            {
              city: city,
            },
            {
              state: state,
            },
          ],
        },
        {
          served_cities: { contains: city + ` - ${state};` },
        },
      ];
    }

    if (service) {
      filter["services"] = { contains: service };
    }

    const credentialsTotal = await prismaClient.credential.count({
      where: filter,
    });

    const credentials = await prismaClient.credential.findMany({
      where: filter,
      orderBy: {
        update_at: "desc",
      },
      skip: page * 30,
      take: 30,
      select: {
        email: true,
        name: true,
        phone_number: true,
        state: true,
        city: true,
        services: true,
        served_cities: true,
        profession: true,
        description: true,
        photo: true,
        enabled: true,
        visible: true,
        id: true,
      },
    });

    const s3Storage = new S3Storage();
    const credentialsResponse = await Promise.all(
      credentials.map(async (credential) => {
        if (credential.photo) {
          credential["photo_url"] = await s3Storage.getTemporaryUrl(
            credential.photo,
            245,
          );
        }

        return credential;
      }),
    );
    return { credentials: credentialsResponse, total: credentialsTotal };
  }
}

export { ListCredentialsService };
