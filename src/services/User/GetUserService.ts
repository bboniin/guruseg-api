import prismaClient from '../../prisma'

interface UserRequest {
    userId: string;
}

class GetUserService {
    async execute({ userId }: UserRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        
        return (user)

    }
}

export { GetUserService }