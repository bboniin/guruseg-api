import prismaClient from '../../../prisma'

interface UserRequest {
    id: string;
}

class DeleteUserService {
    async execute({ id }: UserRequest) {

        const service = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                visible: false,
                email: id
            }

        })
        return (service)
    }
}

export { DeleteUserService }