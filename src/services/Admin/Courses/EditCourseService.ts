import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface CourseRequest {
    name: string;
    userId: string;
    photo: string;
    description: string;
    id: string;
    restricted: boolean,
    order: string;
}

class EditCourseService {
    async execute({ name, description, restricted, userId, order, photo, id }: CourseRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const course = await prismaClient.course.findUnique({
            where: {
                id: id
            },
        })

        if (!name) {
            throw new Error("Nome do curso é obrigatório")
        }

        if (!course) {
            throw new Error("course não existe")
        }


        let orderC = parseInt(order)

        if (!orderC) {
            orderC = 0
        }

        let data = {
            name: name,
            restricted: restricted,
            description: description,
            order: orderC
        }

        if (photo) {
            const s3Storage = new S3Storage()

            if (course["photo"]) {
                await s3Storage.deleteFile(course["photo"])
            }

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }

        const courseRes = await prismaClient.course.update({
            where: {
                id: id
            },
            data: data
        })

        return (courseRes)

    }
}

export { EditCourseService }