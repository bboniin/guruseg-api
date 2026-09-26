import prismaClient from "../../prisma";

interface ListEsocialRequest {
  userId: string;
}

class ListEsocialService {
  async execute({ userId }: ListEsocialRequest) {
    const enterprises = await prismaClient.enterprise.findMany({
      where: {
        user_id: userId,
        esocial_renewal: true,
        visible: true,
      },
      orderBy: {
        update_at: "desc",
      },
    });

    const employees = enterprises.reduce((total, enterprise) => {
      return total + enterprise.employee_count;
    }, 0);

    return { enterprises, total: enterprises.length, employees: employees };
  }
}

export { ListEsocialService };
