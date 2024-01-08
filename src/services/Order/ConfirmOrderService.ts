import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { addDays } from 'date-fns';

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
            }, 
            include: {
                user: true,
                items: true
            }
        })
        
        if (orderGet.collaborator_id) {
            throw new Error("Ordem de serviço já tem um técnico vinculado")
        }

        const tecnico = await prismaClient.collaborator.findFirst({
            where: {
                enabled: true,
                visible: true,
                OR: [{
                    sector: "Todos"
                }, {
                    sector: orderGet.sector
                }],
                user_id: userId
            }, 
        })

        let tecnicosTotal = {}

        let collaborator = {
            id: null
        }

        if (!tecnico) {
            const tecnicos = await prismaClient.collaborator.findMany({
                where: {
                    enabled: true,
                    visible: true,
                    user_id: "",
                    OR: [{
                            sector: orderGet.sector
                        },{
                            sector: "Todos"
                        }]
                }
            })

            const sectores = {
                "Serviços de segurança do Trabalho":  orderGet.user.sector1_id,
                "Revenda de treinamentos online": orderGet.user.sector2_id,
                "Serviços Medicina ocupacional": orderGet.user.sector3_id,
                "Credenciamento SST": orderGet.user.sector4_id,
                "Assinatura Documentos SST": orderGet.user.sector5_id
            }

            if (sectores[orderGet.sector]) {
                collaborator.id = sectores[orderGet.sector]
            } else {
                tecnicos.map((item) => {
                    tecnicosTotal[item.id] = {
                        oss: 0,
                        total: 0
                    }
                })

                if (tecnicos.length != 0) {
                    let total = 0
                    orderGet.items.map((item) => {
                        total += item.amount * item.value
                    })
                    if (total > 100) {
                        const oss = await prismaClient.order.findMany({
                            where: {
                                create_at: {
                                    gte: addDays(new Date(),-7)
                                }
                            },
                            include: {
                                items: true,
                            },
                            orderBy: {
                                create_at: "asc",
                            }
                        })
                
                        oss.map((item) => {
                            let total = 0
                            item.items.map((item) => {
                                total += item.amount * item.value
                            })
                            if (tecnicosTotal[item.collaborator_id]) {
                                tecnicosTotal[item.collaborator_id].total += total
                            }
                        })
                        tecnicos.map((item) => {
                            item["orders"] = tecnicosTotal[item.id].total
                        })
            
                        collaborator = tecnicos.reduce((a,b)=>{
                            if(b["orders"] < a["orders"]) a = b;
                            return a;
                        })
                    } else {
                        const orders = await prismaClient.order.findMany({
                        take: tecnicos.length - 1,
                        where: {
                            AND: [{
                                    collaborator_id: {
                                        not: null
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
                        if (item.collaborator_id && tecnicosTotal[item.collaborator_id] != undefined) {
                            tecnicosTotal[item.collaborator_id].oss++
                        }
                    })
        
                    tecnicos.map((item) => {
                        item["orders"] = tecnicosTotal[item.id].oss
                    })
        
                    collaborator = tecnicos.reduce((a,b)=>{
                        if(b["orders"] < a["orders"]) a = b;
                        return a;
                    })
                    }
                }
            }
            
        } else {
            collaborator = tecnico
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