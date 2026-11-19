import { Request, Response } from "express";
import { SendEmailSSTDiagnosticService } from "../../services/SSTDiagnostic/SendEmailSSTDiagnosticService";

class SendEmailSSTDiagnosticController {
  async handle(req: Request, res: Response) {
    const {
      email,
      phone,
      phone_number,
      company_name,
      name,
      employees_count,
      employees,
      assessment_date,
      pdf_base64,
      custom_message,
      stats,
      non_compliant_items,
      observation,
      location,
      cnpj,
    } = req.body;

    const sendEmailService = new SendEmailSSTDiagnosticService();
    const result = await sendEmailService.execute({
      email,
      phone: phone || phone_number,
      company_name: company_name || name,
      employees_count: employees_count || employees,
      assessment_date,
      pdf_base64,
      custom_message,
      stats,
      non_compliant_items,
      observation,
      location,
      cnpj,
    });

    return res.status(200).json(result);
  }
}

export { SendEmailSSTDiagnosticController };
