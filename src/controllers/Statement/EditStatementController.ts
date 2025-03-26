import { Request, Response } from 'express';
import { EditStatementService } from '../../services/Statement/EditStatementService';

class EditStatementController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const { title, description } = req.body

        const userId = req.userId

        const editStatementService = new EditStatementService

        const statement = await editStatementService.execute({
            title, description, userId, id
        })

        return res.json(statement)
    }
}

export { EditStatementController }