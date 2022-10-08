import prismaClient from '../../../prisma'

interface CourseRequest {
    userId: string;
}

class ListCoursesService {
    async execute({ userId }: CourseRequest) {

        const admin = await prismaClient.admin.findUnique({
            where: {
                id: userId
            }
        })

        if (!admin) {
            throw new Error("Rota restrita ao administrador")
        }

        const courses = await prismaClient.course.findMany({
            orderBy: {
                create_at: "desc"
            }
        })

        return (courses)
    }
}

export { ListCoursesService }