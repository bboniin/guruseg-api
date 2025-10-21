import prismaClient from '../../../prisma'

interface CollaboratorRequest {
    id: string;
}

class DeleteCollaboratorService {
    async execute({ id }: CollaboratorRequest) {

        const collaborator = await prismaClient.collaborator.update({
            where: {
                id: id
            },
            data: {
                visible: false,
                email: id
            }
        })

        const users = await prismaClient.user.findMany({
            where: {
                OR: [{
                        sector1_id: collaborator.id
                    },
                    {
                        sector2_id: collaborator.id
                    },
                    {
                        sector3_id: collaborator.id
                    },
                    {
                        sector4_id: collaborator.id
                    },
                    {
                        sector5_id: collaborator.id
                    }
                ]
            },
        })

        users.map(async (item) => {
            let sector1_id = item.sector1_id
            if (item.sector1_id == collaborator.id) {
                sector1_id = ""
            }
            let sector2_id = item.sector2_id
            if (item.sector2_id == collaborator.id) {
                sector2_id = ""
            }
            let sector3_id = item.sector3_id
            if (item.sector3_id == collaborator.id) {
                sector3_id = ""
            }
            let sector4_id = item.sector4_id
            if (item.sector4_id == collaborator.id) {
                sector4_id = ""
            }
            let sector5_id = item.sector5_id
            if (item.sector5_id == collaborator.id) {
                sector5_id = ""
            }
            await prismaClient.user.update({
                where: {
                    id: item.id
                },
                data: {
                    sector1_id,
                    sector2_id,
                    sector3_id,
                    sector4_id,
                    sector5_id
                }
            })
        })

        return (collaborator)
    }
}

export { DeleteCollaboratorService }