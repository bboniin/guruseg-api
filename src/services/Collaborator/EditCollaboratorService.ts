import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface CollaboratorRequest {
    name: string;
    email: string;
    phone_number: string;
    photo: string;
    collaboratorId: string;
}

class EditCollaboratorService {
    async execute({ name, email, phone_number, photo, collaboratorId }: CollaboratorRequest) {

        if (!email || !name || !phone_number) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        const collaboratorExist = await prismaClient.collaborator.findUnique({
            where: {
                email: email
            }
        })

        if (collaboratorExist) {
            throw new Error("Email já está sendo utilizado")
        }

        let data = {
            name: name,
            email: email,
            phone_number: phone_number
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const collaboratorImage = await prismaClient.collaborator.findUnique({
                where: {
                    id: collaboratorId
                },
            })

            if (collaboratorImage["photo"]) {
                await s3Storage.deleteFile(collaboratorImage["photo"])
            }

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }


        const collaborator = await prismaClient.collaborator.update({
            where: {
                id: collaboratorId
            },
            data: data
        })

        return (collaborator)

    }
}

export { EditCollaboratorService }