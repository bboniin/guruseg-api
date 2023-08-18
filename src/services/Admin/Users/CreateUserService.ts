import prismaClient from '../../../prisma'
import { hash } from "bcryptjs"
import S3Storage from '../../../utils/S3Storage';

interface UserRequest {
    name: string;
    email: string;
    phone_number: string;
    photo: string;
    password: string;
    courseBoolean: boolean;
    courseRestricted: boolean;
    resaleBoolean: boolean;
    collaborator_id: string;
}

class CreateUserService {
    async execute({ name, email, collaborator_id, phone_number, password, photo, courseBoolean, resaleBoolean, courseRestricted }: UserRequest) {


        if (!email || !name || !phone_number || !password) {
            throw new Error("Preencha todos os campos obrigátorios")
        }


        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email já cadastrado.")
        }

        if (photo) {
            const s3Storage = new S3Storage()
            await s3Storage.saveFile(photo)
        } else {
            photo = ""
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                phone_number: phone_number,
                photo: photo,
                collaborator_id: collaborator_id,
                course: courseBoolean,
                resale: resaleBoolean,
                course_restricted: courseRestricted
            },
            select: {
                id: true,
                name: true,
                email: true,
                photo: true,
            }
        })

        return (user)

    }
}

export { CreateUserService }