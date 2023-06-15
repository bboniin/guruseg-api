import prismaClient from '../../prisma';
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface OrderRequest {
    message: string;
    userId: string;
    order_id: number;
    items: Array<[]>;
}

class HandlerOrderService {
    async execute({ message, userId, order_id, items }: OrderRequest) {

        if (items.length == 0 || !userId || !order_id) {
            throw new Error("Preencha todos os campos.")
        }

        const order = await prismaClient.order.findUnique({
            where: {
                id: order_id
            },
            include: {
                items: true,
                user: true,
                collaborator: true
            }
        })  

        if (userId != order.user.id) {
            throw new Error("Essa ordem de serviço não está vinculada a sua conta")
        }

        if (message) {
            await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                    message: message
                }
            })
        }

        items.map(async (data) => {
            let [oldService] = order["items"].filter((item) => { return data["name"] == item.name })
            if (oldService) {
                await prismaClient.item.update({
                    where: {
                        id: oldService.id
                    },
                    data: {
                        amount: oldService["amount"] + data["amount"],
                    }
                })
            } else {
                await prismaClient.item.create({
                    data: {
                        amount: data["amount"],
                        order_id: order.id,
                        name: data["name"],
                        value: data["value"],
                        commission: data["commission"],
                        description: data["description"]
                    }
                })
        }
        })  

        if (order.collaborator) {
            const path = resolve(
                __dirname,
                "..",
                "..",
                "views",
                "handlerOS.hbs"
            );
    
            const templateFileContent = fs.readFileSync(path).toString("utf-8");
    
            const templateParse = handlebars.compile(templateFileContent);
    
            const templateHTML = templateParse({
                id: order.id,
                name: order.collaborator.name,
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
                    name: order.collaborator.name,
                    address: order.collaborator.email,
                },
                subject: `[Guruseg] Novos serviços na OS #${order.id}`,
                html: templateHTML,
            });
        }
       
       return (order.id)
    }
}

export { HandlerOrderService }