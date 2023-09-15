import prismaClient from '../../../prisma'

interface ServiceRequest {
    userId: string;
    collaborator_id: string;
}

class ListUsersCollaboratorService {
    async execute({ userId, collaborator_id }: ServiceRequest) {

        const users = await prismaClient.user.findMany({
            where: {
                OR: [{
                        sector1_id: collaborator_id
                    },
                    {
                        sector2_id: collaborator_id
                    },
                    {
                        sector3_id: collaborator_id
                    },
                    {
                        sector4_id: collaborator_id
                    },
                    {
                        sector5_id: collaborator_id
                    }
                ],
                visible: true
            },
            orderBy: {
                create_at: "asc",
            }
        })

        return (users)
    }
}

export { ListUsersCollaboratorService }