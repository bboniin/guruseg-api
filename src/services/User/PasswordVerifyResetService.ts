import prismaClient from '../../prisma'
import { isAfter, addHours } from 'date-fns';

interface BodyRequest {
    code: string;
}

class PasswordVerifyResetService {
    async execute({ code }: BodyRequest) {

        const passwordCode = await prismaClient.passwordForgot.findFirst({
            where: {
                code: code,
            },
        });

        if (!passwordCode) {
            throw new Error('Código inválido!');
        }

        const dateCreated = passwordCode.create_at;
        const dateLimit = addHours(dateCreated, 2);

        const isCodeExpired = isAfter(new Date(), dateLimit);

        if (isCodeExpired) {
            throw new Error('Código expirou!');
        }
        let user = {}

        const userC = await prismaClient.user.findFirst({
            where: {
                email: passwordCode.user_email
            }
        })

        user = userC

        if (!user) {
            const collaborator = await prismaClient.collaborator.findFirst({
                where: {
                    email: passwordCode.user_email
                }
            })

            if (!collaborator) {
                const credential = await prismaClient.credential.findFirst({
                    where: {
                        email: passwordCode.user_email
                    }
                })

                if (!credential) {
                    throw new Error("Usuário não encontrado")
                }
                user = credential
            } else {
                user = collaborator
            }

        }

        return (user)

    }
}

export { PasswordVerifyResetService }