import { Request, Response } from 'express';
import { CreateDocOrderService } from '../../services/Order/CreateDocOrderService';

class CreateDocOrderController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { type } = req.body

        let file = ""
        if (req.file) {
            file = req.file.filename
        }

        const createDocOrderService = new CreateDocOrderService

        const docs = await createDocOrderService.execute({
            id: parseInt(id), file, type
        })

        return res.json(docs)
    }
}

export { CreateDocOrderController } 