import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import S3Storage from '../../utils/S3Storage';
import { hash } from 'bcryptjs';

interface CredentialRequest {
    email: string;
    name: string;
    password: string;
    phone_number: string;
    state: string;
    city: string;
    photo: string;
    description: string;
    served_cities: string;
    birthday: string;
    services: string;
    profession: string;
}

class AdminCreateCredentialService {
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

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            photo = upload
        }

        if (password) {
            const passwordHash = await hash(password, 8)
            password = passwordHash
        }

        if (email && description && photo && password && name && phone_number && state && city && served_cities && birthday && services && profession) {
            const credential = await prismaClient.credential.create({
                data: {
                    email,
                    password,
                    name,
                    phone_number,
                    state,
                    city,
                    description,
                    photo,
                    served_cities,
                    birthday,
                    services,
                    profession,
                    visible: true,
                    enabled: true
                }
            })
            return (credential)
        } else {
            const credential = await prismaClient.credential.create({
                data: {
                    email,
                    password,
                    name,
                    phone_number,
                    state,
                    city,
                    description,
                    photo,
                    served_cities,
                    birthday,
                    services,
                    profession,
                    visible: true,
                    enabled: false
                }
            })


            const path = resolve(
                __dirname,
                "..",
                "..",
                "views",
                "completedCredential.hbs"
            );

            const templateFileContent = fs.readFileSync(path).toString("utf-8");

            const templateParse = handlebars.compile(templateFileContent);

            const templateHTML = templateParse({
                id: credential.id,
                name: credential.name,
            });

            var transport = await nodemailer.createTransport({
                host: "smtp.gmail.com",
                service: "gmail",
                port: 465,
                secure: true,
                auth: {
                    user: "leonardo@guruseg.com.br",
                    pass: "suimoooumyjdbqct",
                },
            });

            await transport.sendMail({
                from: {
                    name: "Equipe Guruseg",
                    address: "leonardo@guruseg.com.br",
                },
                to: {
                    name: credential.name,
                    address: credential.email,
                },
                subject: "[Guruseg] Seja nosso Credenciado",
                html: templateHTML,
            });

            return (credential)
        }
    }
}

export {
    AdminCreateCredentialService
}