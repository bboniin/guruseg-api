import { hash } from 'bcryptjs';
import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface CollaboratorRequest {
    name: string;
    email: string;
    phone_number: string;
    photo: string;
    password: string;
    enabled: boolean;
    sector: string
    id: string;
}

class EditAdminCollaboratorService {
    async execute({ password, name, email, phone_number, photo, id, sector, enabled }: CollaboratorRequest) {

        const collaborator = await prismaClient.collaborator.findUnique({
            where: {
                id: id
            },
        })

        if (!email || !name || !phone_number) {
            throw new Error("Preencha todos os campos obrigátorios")
        }

        const collaboratorExist = await prismaClient.collaborator.findUnique({
            where: {
                email: email
            }
        })

        if (collaboratorExist) {
            if (collaboratorExist.email != collaborator.email) {
                throw new Error("Email já está sendo utilizado")
            }
        }

        let data = {
            name: name,
            email: email,
            enabled: enabled,
            phone_number: phone_number,
            sector: sector
        }

        if (password) {
            const passwordHash = await hash(password, 8)
            data["password"] = passwordHash
        }

        if (photo) {
            const s3Storage = new S3Storage()

            if (collaborator["photo"]) {
                await s3Storage.deleteFile(collaborator["photo"])
            }

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }


        const collaboratorR = await prismaClient.collaborator.update({
            where: {
                id: id
            },
            data: data
        })

        return (collaboratorR)

    }
}

export { EditAdminCollaboratorService }