import { Resend } from "resend";
import prismaClient from "../../prisma";

interface NonCompliantItem {
  shortName?: string;
  name?: string;
  title?: string;
  norm?: string;
  currentStatus?: string;
  status?: string;
}

interface SendEmailRequest {
  email: string;
  phone?: string;
  company_name: string;
  employees_count?: string | number;
  assessment_date?: string;
  pdf_base64?: string;
  custom_message?: string;
  stats?: {
    conformeCount?: number;
    vencidoCount?: number;
    pendenteCount?: number;
    answeredCount?: number;
    passivoTrabalhistaTotal?: number;
    nonCompliantItems?: NonCompliantItem[];
  };
  non_compliant_items?: NonCompliantItem[];
  observation?: string;
  location?: string;
  cnpj?: string;
}

class SendEmailSSTDiagnosticService {
  async execute({
    email,
    phone,
    company_name,
    employees_count,
    assessment_date,
    pdf_base64,
    custom_message,
    stats,
    non_compliant_items,
    observation,
    location,
    cnpj,
  }: SendEmailRequest) {
    if (!email) {
      throw new Error("E-mail destinatário é obrigatório");
    }

    if (!company_name) {
      throw new Error("Nome da empresa é obrigatório");
    }

    // 1. Constrói a lista e texto de observação com os itens marcados como não conforme ou vencido
    const itemsList =
      non_compliant_items && non_compliant_items.length > 0
        ? non_compliant_items
        : stats?.nonCompliantItems || [];

    let observationText = "";

    if (itemsList.length > 0) {
      const formattedItems = itemsList.map((item) => {
        const itemName =
          item.shortName || item.name || item.title || "Item de SST";
        const normInfo = item.norm ? ` (${item.norm})` : "";
        const rawStatus = (
          item.currentStatus ||
          item.status ||
          ""
        ).toLowerCase();
        const statusLabel =
          rawStatus === "vencido" ? "Vencido" : "Não possui / Não conforme";
        return `• ${itemName}${normInfo}: ${statusLabel}`;
      });

      observationText = `Itens não conformes ou vencidos:\n${formattedItems.join(
        "\n",
      )}`;
    } else if (observation) {
      observationText = observation;
    } else {
      observationText = "Todos os itens avaliados estavam conformes.";
    }

    if (assessment_date) {
      observationText += `\n\nData da avaliação: ${assessment_date}`;
    }

    if (stats?.passivoTrabalhistaTotal) {
      const formattedPassivo = Number(
        stats.passivoTrabalhistaTotal,
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      observationText += `\nPassivo estimado: ${formattedPassivo}`;
    }

    // 2. Salva o LeadMaster no banco com custo 0, campos passados e tag DIAGNÓSTICO SST
    let leadMaster = null;
    try {
      leadMaster = await prismaClient.leadMaster.create({
        data: {
          name: company_name,
          email: email,
          phone_number: phone || null,
          employees: employees_count ? String(employees_count) : null,
          cnpj: cnpj || null,
          location: location || null,
          price: 0,
          value: 0,
          tag: "DIAGNÓSTICO SST",
          necessity: "Diagnóstico SST",
          observation: observationText,
        },
      });
    } catch (leadError) {
      console.error("Erro ao salvar LeadMaster do Diagnóstico SST:", leadError);
    }

    // 3. Disparo do e-mail com o laudo técnico em PDF via Resend
    let emailResponse: any = null;
    const resendKey = process.env.RESEND_KEY;

    if (resendKey) {
      try {
        const resend = new Resend(resendKey);

        const safeCompanyName = (company_name || "empresa")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        const formattedPassivo = stats?.passivoTrabalhistaTotal
          ? Number(stats.passivoTrabalhistaTotal).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "R$ 0,00";

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1f2937; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
            .header { background: #008037; padding: 28px 24px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
            .header p { margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 28px 24px; line-height: 1.6; }
            .greeting { font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 12px; }
            .lead-text { font-size: 15px; color: #374151; margin-bottom: 20px; }
            .summary-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px 20px; margin: 20px 0; }
            .summary-title { font-size: 14px; font-weight: 700; color: #008037; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
            .summary-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
            .summary-row:last-child { border-bottom: none; }
            .summary-label { color: #6b7280; }
            .summary-value { font-weight: 600; color: #111827; }
            .btn-action { display: block; text-align: center; background: #008037; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 24px; border-radius: 50px; margin: 26px auto 10px; max-width: 280px; }
            .footer { background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Diagnóstico de Segurança do Trabalho</h1>
              <p>Relatório Técnico de Conformidade Legal • Guruseg</p>
            </div>

            <div class="content">
              <div class="greeting">Olá, equipe da ${company_name}!</div>
              <p class="lead-text">
                O seu <strong>Diagnóstico de Segurança e Saúde no Trabalho (SST)</strong> foi concluído com sucesso. O <strong>laudo técnico oficial em formato PDF</strong> está anexado a este e-mail.
              </p>

              <div class="summary-card" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px 20px; margin: 20px 0;">
                <div class="summary-title" style="font-size: 14px; font-weight: 700; color: #008037; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Resumo da Avaliação</div>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; text-align: left;">Empresa:&nbsp;</td>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827; text-align: right;">${company_name}</td>
                  </tr>
                  ${
                    phone
                      ? `
                  <tr>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; text-align: left;">Telefone / WhatsApp:&nbsp;</td>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827; text-align: right;">${phone}</td>
                  </tr>`
                      : ""
                  }
                  ${
                    assessment_date
                      ? `
                  <tr>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; text-align: left;">Data da Avaliação:&nbsp;</td>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827; text-align: right;">${assessment_date}</td>
                  </tr>`
                      : ""
                  }
                  ${
                    employees_count
                      ? `
                  <tr>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; text-align: left;">Nº de Colaboradores:&nbsp;</td>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827; text-align: right;">${employees_count}</td>
                  </tr>`
                      : ""
                  }
                  ${
                    stats
                      ? `
                  <tr>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; text-align: left;">Itens Conformes (Em dia):&nbsp;</td>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #008037; text-align: right;">${
                      stats.conformeCount || 0
                    }</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; text-align: left;">Itens Vencidos:&nbsp;</td>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #ea580c; text-align: right;">${
                      stats.vencidoCount || 0
                    }</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; text-align: left;">Itens Pendentes / Não Possui:&nbsp;</td>
                    <td style="padding: 7px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #dc2626; text-align: right;">${
                      stats.pendenteCount || 0
                    }</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; text-align: left;">Passivo Trabalhista Estimado:&nbsp;</td>
                    <td style="padding: 8px 0; font-weight: 700; color: #dc2626; font-size: 15px; text-align: right;">${formattedPassivo}</td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </div>

              ${
                custom_message
                  ? `<p class="lead-text">${custom_message}</p>`
                  : `
              <p class="lead-text">
                Este relatório técnico mapeou as Normas Regulamentadoras (NRs) e as exigências do eSocial pertinentes à sua operação, apontando as medidas preventivas e documentos obrigatórios para blindar sua empresa contra autuações e multas do Ministério do Trabalho.
              </p>
              `
              }

              <a href="https://wa.me/5563992123451?text=${encodeURIComponent(
                `Olá Guruseg! Recebi o Diagnóstico SST da ${company_name} por e-mail e gostaria de falar com um especialista sobre a regularização.`,
              )}" class="btn-action">
                Falar com Especialista SST
              </a>
            </div>

            <div class="footer">
              © ${new Date().getFullYear()} Guruseg Gestão em Segurança do Trabalho • Todos os direitos reservados.
            </div>
          </div>
        </body>
        </html>
        `;

        const attachments: any[] = [];

        if (pdf_base64) {
          const cleanBase64 = pdf_base64.replace(
            /^data:application\/pdf;base64,/,
            "",
          );
          attachments.push({
            filename: `diagnostico-sst-${safeCompanyName || "empresa"}.pdf`,
            content: Buffer.from(cleanBase64, "base64"),
          });
        }

        emailResponse = await resend.emails.send({
          from: "Equipe Guruseg <noreply@gurusegead.com.br>",
          to: email,
          subject: `[Guruseg] Diagnóstico SST Concluído - ${company_name}`,
          html: htmlContent,
          attachments: attachments.length > 0 ? attachments : undefined,
        });
      } catch (emailError) {
        console.error("Erro ao disparar e-mail via Resend:", emailError);
      }
    }

    return {
      message: "Diagnóstico SST processado com sucesso!",
      email_id: emailResponse?.data?.id || emailResponse?.id,
      lead_master_id: leadMaster?.id,
    };
  }
}

export { SendEmailSSTDiagnosticService };
