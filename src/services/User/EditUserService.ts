import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface UserRequest {
    name: string;
    email: string;
    phone_number: string;
    photo: string;
    userId: string;
}

class EditUserService {
    async execute({ name, email, phone_number, photo, userId }: UserRequest) {

        if (!email || !name || !phone_number) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        let data = {
            name: name,
            email: email,
            phone_number: phone_number
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const userImage = await prismaClient.user.findUnique({
                where: {
                    id: userId
                },
            })

            if (userImage["photo"]) {
                await s3Storage.deleteFile(userImage["photo"])
            }
            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }


        const user = await prismaClient.user.update({
            where: {
                id: userId
            },
            data: data
        })

        return (user)

    }
}

export { EditUserService }