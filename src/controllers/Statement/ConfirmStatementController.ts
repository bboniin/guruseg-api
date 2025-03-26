import { Request, Response } from 'express';
import { ConfirmStatementService } from '../../services/Statement/ConfirmStatementService';

class ConfirmStatementController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const userId = req.userId

        const confirmStatementService = new ConfirmStatementService

        const statement = await confirmStatementService.execute({
            userId: userId, id: id, 
        })

        return res.json(statement)
    }
}

export { ConfirmStatementController }