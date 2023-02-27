import prismaClient from '../../prisma'

interface CredentialRequest {
    id: string;
}

class GetCredentialService {
    async execute({ id }: CredentialRequest) {

        const credential = await prismaClient.credential.findUnique({
            where: {
                id: id
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
                rg: true,
                cpf: true,
                birthday: true,
                description: true,
                photo: true,
                enabled: true,
                visible: true,
                id: true
            }
        })

        if (!credential) {
            throw new Error("Credenciado não foi encontrado")
        }

        return (credential)
    }
}

export { GetCredentialService }