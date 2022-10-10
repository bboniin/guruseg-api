import prismaClient from '../../../prisma'

interface ServiceRequest {
    id: string;
}

class GetUserService {
    async execute({ id }: ServiceRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            },
            select: {
                name: true,
                email: true,
                course: true
            }
        })

        if (!user) {
            throw new Error("Franquiado não foi encontrado.")
        }

        return (user)
    }
}

export { GetUserService }