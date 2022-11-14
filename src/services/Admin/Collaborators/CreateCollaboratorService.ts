import prismaClient from '../../../prisma'
import { hash } from "bcryptjs"
import S3Storage from '../../../utils/S3Storage';

interface CollaboratorRequest {
    name: string;
    email: string;
    phone_number: string;
    photo: string;
    password: string;
    sector: string
}

class CreateCollaboratorService {
    async execute({ name, email, phone_number, password, photo, sector }: CollaboratorRequest) {

        if (!email || !name || !phone_number || !password || !sector) {
            throw new Error("Preencha todos os campos obrigátorios")
        }


        const collaboratorAlreadyExists = await prismaClient.collaborator.findFirst({
            where: {
                email: email
            }
        })

        if (collaboratorAlreadyExists) {
            throw new Error("Email já cadastrado.")
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
                sector: sector
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