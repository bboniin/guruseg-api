import { Request, Response } from 'express';
import { ListAdminOrdersService } from '../../services/Admin/ListAdminOrdersService';

class ListAdminOrdersController {
    async handle(req: Request, res: Response) {
        const { type, id } = req.params

        const { month } = req.query


        const listAdminOrdersService = new ListAdminOrdersService

        const orders = await listAdminOrdersService.execute({
            type, id, month: String(month)
        })


        return res.json(orders)
    }
}

export { ListAdminOrdersController }