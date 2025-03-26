import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface OrderRequest {
    id: number;
    userId: string;
    message: string;
}

class RecusedOrderService {
    async execute({ id, userId, message }: OrderRequest) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: id
            },
            include: {
                user: true
            }
        })

        if (!order) {
            throw new Error("Ordem de serviço já excluida.")
        }

        if (order.collaborator_id) {
            throw new Error("Ordem de serviço já foi aceita ou recusada por outro técnico.")
        }


        const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "recusedOS.hbs"
        );

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse({
            id: order.id,
            name: order.user.name,
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
                name: order.user.name,
                address: order.user.email,
            },
            subject: "[Guruseg] Atualização Ordem de Serviço",
            html: templateHTML,
        });

        const orderD = await prismaClient.order.update({
            where: {
                id: id
            },
            data: {
                status: "recusado",
                message: message,
                update_at: new Date(),
                collaborator_id: userId
            }
        })
        return (orderD)
    }
}

export { RecusedOrderService }