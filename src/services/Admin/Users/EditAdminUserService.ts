import { hash } from 'bcryptjs';
import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface UserRequest {
    name: string;
    email: string;
    phone_number: string;
    photo: string;
    password: string;
    id: string;
    courseBoolean: boolean;
    resaleBoolean: boolean;
}

class EditAdminUserService {
    async execute({ name, email, phone_number, photo, id, password, courseBoolean, resaleBoolean }: UserRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            },
        })

        if (!email || !name || !phone_number) {
            throw new Error("Preencha todos os campos obrigátorios")
        }

        const userExist = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        if (userExist) {
            if (userExist.email != user.email) {
                throw new Error("Email já está sendo utilizado")
            }
        }

        let data = {
            name: name,
            email: email,
            course: courseBoolean,
            phone_number: phone_number,
            resale: resaleBoolean
        }

        if (password) {
            const passwordHash = await hash(password, 8)
            data["password"] = passwordHash
        }


        if (photo) {
            const s3Storage = new S3Storage()



            if (user["photo"]) {
                await s3Storage.deleteFile(user["photo"])
            }

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }


        const userRes = await prismaClient.user.update({
            where: {
                id: id
            },
            data: data
        })

        return (userRes)

    }
}

export { EditAdminUserService }