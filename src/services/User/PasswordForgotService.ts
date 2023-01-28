import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface BodyRequest {
    email: string;
}

class PasswordForgotService {


    async execute({ email }: BodyRequest) {

        if (!email) {
            throw new Error("Insira o email")
        }

        let user = {}

        const userC = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        user = userC

        if (!user) {
            const collaborator = await prismaClient.collaborator.findFirst({
                where: {
                    email: email
                }
            })

            if (!collaborator) {
                throw new Error("Usuário não encontrado")
            }

            user = collaborator
        }

        const code = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;

        await prismaClient.passwordForgot.create({
            data: {
                user_email: email,
                code: String(code),
            }
        });

        const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "forgotPassword.hbs"
        );

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse({
            code,
            name: user["name"],
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
                name: user["name"],
                address: user['email'],
            },
            subject: "[Guruseg] Recuperação de senha",
            html: templateHTML,
        });

        return;

    }
}

export { PasswordForgotService }