import { Request, Response } from "express";
import { CreateCustomerService } from "../../services/Payment/CreateCustomerService";

class CreateCustomerController {
  async handle(req: Request, res: Response) {
    const { cpf } = req.body;

    let userId = req.userId;

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({
      cpf,
      userId,
    });

    return res.json(customer);
  }
}

export { CreateCustomerController };
