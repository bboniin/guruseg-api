import { Request, Response } from 'express';
import { ListStatementsUserService } from '../../services/Statement/ListStatementsUserService';

class ListStatementsUserController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listStatementsUserService = new ListStatementsUserService

        const statements = await listStatementsUserService.execute({
            userId: userId
        })

        return res.json(statements)
    }
}

export { ListStatementsUserController }