import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface OrderRequest {
    observation: string;
    userId: string;
    month: string;
    urgent: boolean;
    name: string;
    sector: string;
    items: Array<[]>;
}

class CreateOrderService {
    async execute({ observation, userId, name, items, month, urgent, sector }: OrderRequest) {

        if (items.length == 0 || !userId || !month || !sector) {
            throw new Error("Preencha todos os campos.")
        }

        const tecnicos = await prismaClient.collaborator.findMany({
            where: {
                OR: [{
                   sector: sector
                },
                {
                   sector: "Todos"
                },
                ]
            }
        })

        let tecnicosId = {}

        let collaborator = {
            id: null
        }

        tecnicos.map((item) => {
            tecnicosId[item.id] = 0
        })
        
        if (tecnicos.length != 0) {
             const orders = await prismaClient.order.findMany({
                take: tecnicos.length * 2 - 1,
                where: {
                    sector: sector
                },
                orderBy: {
                    create_at: "desc"
                }
            })
            
            orders.map((item) => {
                if (item.collaborator_id && tecnicosId[item.collaborator_id] != undefined) {
                    tecnicosId[item.collaborator_id]++
                }
            })

            tecnicos.map((item) => {
                item["orders"] = tecnicosId[item.id]
            })

            collaborator = tecnicos.reduce((a,b)=>{
                if(b["orders"] < a["orders"]) a = b;
                return a;
            })
        }

        const order = await prismaClient.order.create({
            data: {
                observation: observation,
                user_id: userId,
                month: month,
                name: name,
                sector: sector,
                urgent: urgent,
                collaborator_id: collaborator.id
            },
            include: {
                collaborator: collaborator.id ? true : false
            }
        })  

        order["items"] = [] 
        items.map(async (data) => {
            const itemOrder = await prismaClient.item.create({
                data: {
                    amount: data["amount"],
                    order_id: order.id,
                    name: data["name"],
                    value: data["value"],
                    commission: data["commission"],
                    description: data["description"]
                }
            })
            order["items"].push(itemOrder)
        })  

        if (collaborator.id) {
            const path = resolve(
                __dirname,
                "..",
                "..",
                "views",
                "receivedOS.hbs"
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
                subject: "[Guruseg] Recebimento de OS",
                html: templateHTML,
            });
    
        }
       
       return (order)
    }
}

export { CreateOrderService }