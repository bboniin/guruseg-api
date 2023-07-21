import { Request, Response } from 'express';
import { ListAdminOrdersPeriodoService } from '../../services/Admin/ListAdminOrdersPeriodoService';

class ListAdminOrdersPeriodoController {
    async handle(req: Request, res: Response) {

        const { start_date, end_date } = req.body


        const listAdminOrdersPeriodoService = new ListAdminOrdersPeriodoService

        const orders = await listAdminOrdersPeriodoService.execute({
            start_date, end_date
        })


        return res.json(orders)
    }
}

export { ListAdminOrdersPeriodoController }