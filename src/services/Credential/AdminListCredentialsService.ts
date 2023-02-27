import prismaClient from '../../prisma'

interface CredentialRequest {
}

class AdminListCredentialsService {
    async execute({ }: CredentialRequest) {

        const credentials = await prismaClient.credential.findMany({
            orderBy: {
                update_at: "desc"
            },
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
                id: true
            }
        })

        return (credentials)
    }
}

export {
    AdminListCredentialsService
}