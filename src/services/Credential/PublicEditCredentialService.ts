import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';
import authConfig from "../../utils/auth"

interface CredentialRequest {
    id: string;
    email: string;
    name: string;
    password: string;
    phone_number: string;
    state: string;
    city: string;
    served_cities: string;
    birthday: string;
    services: string;
    photo: string;
    description: string;
    profession: string;
}

class PublicEditCredentialService {
    async execute({ id, email, description, photo, password, name, phone_number, state, city, served_cities, birthday, services, profession }: CredentialRequest) {

        const credential = await prismaClient.credential.findFirst({
            where: {
                id: id,
                enabled: true
            }
        })

        if (!credential) {
            throw new Error("Credenciado não encontrado ou cadastro já foi concluido.")
        }

        const credentialEmail = await prismaClient.credential.findUnique({
            where: {
                email: email
            }
        })

        if (credentialEmail) {
            if (credentialEmail.id != credential.id) {
                throw new Error("O email digitado já está sendo usado.")
            }
        }

        if (!email || !description || !password || !name || !phone_number || !state || !city || !served_cities || !birthday || !services || !profession) {
            throw new Error("Preencha todos os campos para salvar.")
        }

        let data = {
            name: name,
            email: email,
            phone_number: phone_number,
            state: state,
            city: city,
            served_cities: served_cities,
            birthday: birthday,
            services: services,
            profession: profession,
            description: description,
            enabled: true,
            visible: true
        }

        if (password) {
            const passwordHash = await hash(password, 8)
            data["password"] = passwordHash
        }

        if (photo) {
            const s3Storage = new S3Storage()

            if (credential["photo"]) {
                await s3Storage.deleteFile(credential["photo"])
            }

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        } else {
            if (!credential.photo) {
                throw new Error("Envio da imagem é obrigatório")
            }
        }

        const token = sign({
            name: credential.name,
            email: credential.email
        }, authConfig.jwt.secret, {
            subject: credential.id,
            expiresIn: '365d'
        })

        await prismaClient.credential.update({
            where: {
                id: id
            },
            data: data
        })

        return ({
            id: credential.id,
            token
        })
    }
}

export {
    PublicEditCredentialService
}