import prismaClient from '../../prisma'
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import authConfig from "./../../utils/auth"

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email e Senha não correspondem ou não existe.")
        }

        const passwordMatch = await compare(password, user.password)

        const token = sign({
            name: user.name,
            email: user.email
        }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: '365d'
        })

        if (!passwordMatch) {
            throw new Error("Email e Senha não correspondem ou não existe.")
        }

        let photo_url = "https://guruseg-data.s3.sa-east-1.amazonaws.com/" + user.photo

        return ({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type,
                photo: user.photo,
                photo_url: photo_url,
                phone_number: user.phone_number
            },
            token
        })

    }
}

export { AuthUserService }