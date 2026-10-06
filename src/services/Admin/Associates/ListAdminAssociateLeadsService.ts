import { endOfDay, startOfDay } from "date-fns";
import prismaClient from "../../../prisma";
import S3Storage from "../../../utils/S3Storage";

interface LeadRequest {
  associate_id: string;
  page: number;
  dateStart?: string;
  dateEnd?: string;
  status?: string;
  search?: string;
}

class ListAdminAssociateLeadsService {
  async execute({
    associate_id,
    page,
    dateStart,
    dateEnd,
    status,
    search,
  }: LeadRequest) {
    let filter: any = {
      associate_id: associate_id,
    };

    if (status) {
      if (status == "Pendente") {
        filter["leads"] = { none: {} };
      } else {
        filter["leads"] = {
          some: {
            status,
          },
        };
      }
    }

    if (dateStart && dateEnd) {
      filter["create_at"] = {
        gte: startOfDay(new Date(dateStart)),
        lte: endOfDay(new Date(dateEnd)),
      };
    }

    if (search) {
      filter["OR"] = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const total = await prismaClient.leadMaster.count({
      where: filter,
    });

    const leads = await prismaClient.leadMaster.findMany({
      where: filter,
      skip: page * 30,
      take: 30,
      orderBy: {
        create_at: "desc",
      },
      include: {
        leads: {
          include: {
            user: true,
          },
        },
      },
    });

    const s3Storage = new S3Storage();
    const leadsResponse = await Promise.all(
      leads.map(async (lead) => {
        if (lead.leads?.[0]?.user.photo) {
          lead.leads[0].user["photo_url"] = await s3Storage.getTemporaryUrl(
            lead.leads[0].user.photo,
            245,
          );
        }

        return leadsResponse;
      }),
    );
    return { leads: leadsResponse, total };
  }
}

export { ListAdminAssociateLeadsService };
