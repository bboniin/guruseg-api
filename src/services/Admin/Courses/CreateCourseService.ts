import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface CourseRequest {
    name: string;
    userId: string;
    photo: string;
    order: string;
    restricted: boolean;
    description: string;
}

class CreateCourseService {
    async execute({ userId, name, photo, order, restricted, description }: CourseRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        if (!name) {
            throw new Error("Nome do curso é obrigatório")
        }

        if (photo) {
            const s3Storage = new S3Storage()
            await s3Storage.saveFile(photo)
        }

        let orderC = parseInt(order)

        if (!orderC) {
            orderC = 0
        }

        const courseRes = await prismaClient.course.create({
            data: {
                name: name,
                description: description,
                photo: photo,
                restricted: restricted,
                order: orderC
            }
        })

        return (courseRes)

    }
}

export { CreateCourseService }