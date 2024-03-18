import { Request, Response } from 'express';
import { ListAdminOrdersService } from '../../services/Admin/ListAdminOrdersService';

class ListAdminOrdersController {
    async handle(req: Request, res: Response) {
        const { type, id } = req.params

        const { finance, endDate, startDate } = req.query

        const listAdminOrdersService = new ListAdminOrdersService


        const orders = await listAdminOrdersService.execute({
            type, id, finance: finance == "true", endDate: new Date(String(endDate)), startDate: new Date(String(startDate))
        })

        return res.json(orders)
    }
}

export { ListAdminOrdersController }