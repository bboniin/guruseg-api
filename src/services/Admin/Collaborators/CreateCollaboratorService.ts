import prismaClient from '../../../prisma'
import { hash } from "bcryptjs"
import S3Storage from '../../../utils/S3Storage';

interface CollaboratorRequest {
    name: string;
    email: string;
    phone_number: string;
    photo: string;
    enabled: boolean
    password: string;
    sector: string;
    user_id: string;
}

class CreateCollaboratorService {
    async execute({ name, email, phone_number, user_id, password, photo, sector, enabled }: CollaboratorRequest) {

        if (!email || !name || !phone_number || !password || !sector) {
            throw new Error("Preencha todos os campos obrigátorios")
        }


        const collaboratorAlreadyExistEmail = await prismaClient.collaborator.findFirst({
            where: {
                email: email,
            }
        })

        if (collaboratorAlreadyExistEmail) {
            throw new Error("Email já cadastrado.")
        }

        const collaboratorAlreadyExistUser = await prismaClient.collaborator.findFirst({
            where: {
                sector: sector,
                user_id: user_id
            }
        })

        if (collaboratorAlreadyExistUser) {
            throw new Error("Franqueado já vinculado a outro técnico desse setor.")
        }

        if (photo) {
            const s3Storage = new S3Storage()
            await s3Storage.saveFile(photo)
        } else {
            photo = ""
        }

        const passwordHash = await hash(password, 8)

        const collaborator = await prismaClient.collaborator.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                phone_number: phone_number,
                photo: photo,
                enabled: enabled,
                sector: sector,
                user_id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                photo: true,
            }
        })

        return (collaborator)

    }
}

export { CreateCollaboratorService }