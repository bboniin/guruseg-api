import { Request, Response } from 'express';
import { DeleteStatementService } from '../../services/Statement/DeleteStatementService';

class DeleteStatementController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const userId = req.userId

        const deleteStatementService = new DeleteStatementService

        const statement = await deleteStatementService.execute({
            id, userId
        })

        return res.json(statement)
    }
}

export { DeleteStatementController }