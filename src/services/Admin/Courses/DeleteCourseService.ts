import prismaClient from '../../../prisma'

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

        const courses = await prismaClient.course.delete({
            where: {
                id: id,
            },
        })

        return (courses)
    }
}

export { DeleteCourseService }