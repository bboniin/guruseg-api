import { endOfDay, startOfDay, addDays } from 'date-fns';
import prismaClient from '../../prisma'

interface ReminderRequest {
    page: number;
    userId: string;
    dateStart: string;
    dateEnd: string;
    status: string;
    lead_id: string;
}

class ListRemindersService {
    async execute({ page, userId, status, lead_id, dateStart, dateEnd}: ReminderRequest) {

        let filter = {}

        filter["lead"] = {
            is: {
               user_id: userId 
            }
        }

        if(lead_id){
            filter["lead_id"] = lead_id
        }

        if(status){
            switch(status){
                case "vencido" : {
                    filter["confirm"] = false
                    filter["date"] = {
                        lte: startOfDay(new Date())
                    }
                    break;
                }
                case "avencer" : {
                    filter["confirm"] = false
                    filter["date"] = {
                        gte: startOfDay(new Date()),
                        lte: endOfDay(addDays(new Date(), 15))
                    }
                    break;
                }
                case "pendente" : {
                    filter["confirm"] = false
                    filter["date"] = {
                        gte: startOfDay(new Date()),
                    }
                    if(dateStart){
                        filter["date"] = {
                            gte: startOfDay(new Date(dateStart)),
                            lte: endOfDay(new Date(dateEnd))
                        }
                    }
                    break;
                }
                case "concluido" : {
                    filter["confirm"] = true
                    if(dateStart){
                        filter["date"] = {
                            gte: startOfDay(new Date(dateStart)),
                            lte: endOfDay(new Date(dateEnd))
                        }
                    }
                    break;
                }
            }
        }else{
            if(dateStart){
                filter["date"] = {
                    gte: startOfDay(new Date(dateStart)),
                    lte: endOfDay(new Date(dateEnd))
                }
            } 
        }


        const listRemindersTotal = await prismaClient.leadReminders.count({
            where: filter,
        })

        const listReminders = await prismaClient.leadReminders.findMany({
            where: filter,
            skip: page*30,
            take: 30,
            orderBy: {
               date: 'desc',
            },
            include: {
                lead: {
                    include: {
                        contracts: true,
                        lead_reminders: true
                    }
                }
            }
        })

        return ({reminders: listReminders, remindersTotal: listRemindersTotal})
    }
}

export { ListRemindersService }