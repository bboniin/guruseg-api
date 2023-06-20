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

class ConfirmOrderService {
    async execute({ userId, id, message}: OrderRequest) {

        if (!id || !userId) {
            throw new Error("Preencha todos os campos.")
        }
        
        const orderGet = await prismaClient.order.findUnique({
            where: {
             id: id
            }
        })
        
        if (orderGet.collaborator_id) {
            throw new Error("Ordem de serviço já tem um técnico vinculado")
        }

        const tecnicos = await prismaClient.collaborator.findMany({
            where: {
                enabled: true,
                visible: true,
                OR: [{
                   sector: orderGet.sector
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
                take: tecnicos.length - 1,
                where: {
                    OR: [{
                        status: {
                            not: "pendente",
                        }},
                        {
                        status: {
                            not: "cancelado",
                        }},
                        {
                        status: {
                            not: "recusado",
                        }},
                        {
                        status: {
                            not: "aberto",
                        }
                    }],
                    id: {
                        not: orderGet.id 
                    },
                    sector: orderGet.sector
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
        
        const order = await prismaClient.order.update({
            where: {
                id: id,
            },
            data: {
                message: message,
                status: collaborator.id ? "andamento" : "aberto",
                collaborator_id: collaborator.id
            },
            include: {
                collaborator: true,
            }
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

export { ConfirmOrderService }