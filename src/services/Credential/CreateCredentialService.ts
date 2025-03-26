import prismaClient from '../../prisma'
import authConfig from "../../utils/auth"
import S3Storage from '../../utils/S3Storage';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface CredentialRequest {
    email: string;
    name: string;
    password: string;
    phone_number: string;
    state: string;
    city: string;
    served_cities: string;
    birthday: string;
    photo: string;
    services: string;
    profession: string;
    description: string;
}

class CreateCredentialService {
    async execute({ email, photo, description, password, name, phone_number, state, city, served_cities, birthday, services, profession }: CredentialRequest) {

        if (!email || !name) {
            throw new Error("Preencha pelo menos o nome e email para cadastrar o credenciado.")
        }

        const credentialEmail = await prismaClient.credential.findUnique({
            where: {
                email: email
            }
        })

        if (credentialEmail) {
            throw new Error("O email digitado já está sendo usado.")
        }

        if (!email || !photo || !description || !password || !name || !phone_number || !state || !city || !served_cities || !birthday || !services || !profession) {
            throw new Error("Preencha todos os campos para salvar.")
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            photo = upload
        }

        if (password) {
            const passwordHash = await hash(password, 8)
            password = passwordHash
        }

        const credential = await prismaClient.credential.create({
            data: {
                email,
                password,
                name,
                phone_number,
                state,
                photo,
                description,
                city,
                served_cities,
                birthday,
                services,
                profession,
                enabled: true
            }
        })

        const token = sign({
            name: credential.name,
            email: credential.email
        }, authConfig.jwt.secret, {
            subject: credential.id,
            expiresIn: '365d'
        })

        return ({
            id: credential.id,
            token
        })
    }
}

export {
    CreateCredentialService
}