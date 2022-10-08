import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface CourseRequest {
    name: string;
    userId: string;
    photo: string;
    description: string;
}

class CreateCourseService {
    async execute({ userId, name, photo, description }: CourseRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        if (!name) {
            throw new Error("Nome do curso é obrigátorio")
        }

        if (photo) {
            const s3Storage = new S3Storage()
            await s3Storage.saveFile(photo)
        }

        const courseRes = await prismaClient.course.create({
            data: {
                name: name,
                description: description,
                photo: photo
            }
        })

        return (courseRes)

    }
}

export { CreateCourseService }