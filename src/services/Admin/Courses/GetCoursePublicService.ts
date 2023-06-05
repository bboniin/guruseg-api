import prismaClient from '../../../prisma'

interface CourseRequest {
    userId: string;
    course_id: string;
}

class GetCoursePublicService {
    async execute({ userId, course_id }: CourseRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        const course = await prismaClient.course.findUnique({
            where: {
                id: course_id,
            },
            include: {
                lessons: true
            }
        })

        if (user.course_restricted) {
            if (course.restricted) {
                throw new Error("Você não tem o acesso a esse curso")
            }
        }

        return (course)
    }
}

export { GetCoursePublicService }