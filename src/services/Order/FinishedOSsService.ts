import { addDays, differenceInDays } from 'date-fns';
import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

class FinishedOSsService {
    async execute() {

        const orders = await prismaClient.order.findMany({
            where: { status: "validacao" },
            include: {
                user: true,
                collaborator: true
            }
        })

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

        orders.map(async (item) => {
            if (differenceInDays(item.update_at, new Date()) <= -2) {
                const path = resolve(
                    __dirname,
                    "..",
                    "..",
                    "views",
                    "finishedOS.hbs"
                );

                const templateFileContent = fs.readFileSync(path).toString("utf-8");

                const templateParse = handlebars.compile(templateFileContent);

                const templateHTML = templateParse({
                    id: item.id,
                    name: item.user.name,
                });

                await transport.sendMail({
                    from: {
                        name: "Equipe Guruseg",
                        address: "leonardo@guruseg.com.br",
                    },
                    to: [{
                        name: item.user.name,
                        address: item.user.email,
                    },
                    {
                        name: item.collaborator.name,
                        address: item.collaborator.email,
                    },],
                    subject: "[Guruseg] Atualização Ordem de Serviço",
                    html: templateHTML,
                });

                await prismaClient.order.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        status: "finalizado",
                        message: "",
                        update_at: new Date(),
                    }
                })
            }
        })
        return ""
    }
}

export { FinishedOSsService }