import prismaClient from '../../../prisma'
import S3Storage from '../../../utils/S3Storage';

interface CourseRequest {
    userId: string;
    id: string;
}

class DeleteCourseService {
    async execute({ userId, id }: CourseRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const course = await prismaClient.course.findFirst({
            where: {
                id: id,
            },
        })

        if (course.photo) {
            const s3Storage = new S3Storage()
            await s3Storage.deleteFile(course["photo"])
        }

        const courseD = await prismaClient.course.delete({
            where: {
                id: id,
            },
        })

        return (courseD)
    }
}

export { DeleteCourseService }