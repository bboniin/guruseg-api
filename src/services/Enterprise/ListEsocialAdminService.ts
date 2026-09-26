import prismaClient from "../../prisma";

interface ListEsocialAdminRequest {
  userId: string;
}

class ListEsocialAdminService {
  async execute({ userId }: ListEsocialAdminRequest) {
    let filter = {
      esocial_renewal: true,
      visible: true,
    };

    if (userId) {
      filter["user_id"] = userId;
    }

    const enterprises = await prismaClient.enterprise.findMany({
      where: filter,
      orderBy: {
        update_at: "desc",
      },
      include: {
        user: true,
      },
    });

    const employees = enterprises.reduce((total, enterprise) => {
      return total + enterprise.employee_count;
    }, 0);

    return { enterprises, total: enterprises.length, employees: employees };
  }
}

export { ListEsocialAdminService };
