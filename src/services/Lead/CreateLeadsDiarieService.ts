import { addDays, format } from "date-fns";
import prismaClient from "../../prisma";
import axios from "axios";

class CreateLeadsDiarieService {
  async execute() {
    let leads = [];
    await axios
      .post(
        "https://api.casadosdados.com.br/v5/cnpj/pesquisa",
        {
          codigo_atividade_principal: [
            "4120400",
            "4399103",
            "4399102",
            "4399101",
            "4330404",
            "4330402",
            "4330403",
            "4330401",
            "4330499",
            "4322301",
            "4321500",
            "4399199",
            "4311801",
            "6920601",
            "6920602",
            "6110803",
            "0115600",
            "1011201",
            "0151201",
            "0151203",
            "4634601",
            "3314711",
            "4329199",
            "2599301",
            "2542000",
            "4771701",
            "4771702",
            "4771704",
            "4221903",
            "4299599",
            "7112000",
            "2823200",
            "4322302",
            "4731800",
            "4721101",
            "5611201",
            "1091102",
            "4721102",
          ],
          situacao_cadastral: ["ATIVA"],
          uf: [
            "sc",
            "sp",
            "to",
            "ro",
            "rs",
            "rj",
            "pi",
            "pa",
            "mt",
            "ma",
            "ce",
            "ba",
            "am",
            "ap",
            "df",
            "es",
            "pr",
            "rn",
            "al",
            "pb",
            "pe",
            "go",
            "pr",
          ],
          data_abertura: {
            inicio: format(addDays(new Date(), -1), "yyyy-MM-dd"),
            fim: format(addDays(new Date(), -1), "yyyy-MM-dd"),
          },
          capital_social: {
            minimo: 50000,
          },
          mais_filtros: {
            somente_matriz: true,
            somente_filial: false,
            com_email: true,
            com_telefone: true,
            somente_fixo: false,
            somente_celular: true,
            excluir_empresas_visualizadas: true,
            excluir_email_contab: true,
          },
          pagina: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key":
              "54735aedbbbf71ae91a08664e0cc43a23a7df81672d1baff7750b2fd771a3de0719373ef76c874adb6695080a168379722f4e1e4f68b5e3fb50580f329f212b1",
          },
        },
      )
      .then((response) => {
        leads = response.data?.cnpjs || [];
      })
      .catch((response) => {
        console.log(response);
      });
    await Promise.all(
      leads.map(async (item) => {
        await axios
          .get(`https://api.casadosdados.com.br/v4/cnpj/${item.cnpj}`, {
            headers: {
              "Content-Type": "application/json",
              "api-key":
                "xx54735aedbbbf71ae91a08664e0cc43a23a7df81672d1baff7750b2fd771a3de0719373ef76c874adb6695080a168379722f4e1e4f68b5e3fb50580f329f212b1",
            },
          })
          .then(async (response) => {
            const lead = response.data;
            await prismaClient.leadMaster.create({
              data: {
                name: lead.razao_social,
                value: 0,
                email: lead.contato_email[0].email,
                phone_number: `(${lead.contato_telefonico[0].ddd}) ${lead.contato_telefonico[0].numero}`,
                observation: "",
                employees: "",
                necessity: "",
                cnpj: lead.cnpj,
                price: 2.97,
                tag: "API",
                location: `${lead.endereco.municipio} - ${lead.endereco.uf}`,
              },
            });
          })
          .catch(() => {});
      }),
    );
    return "";
  }
}

export { CreateLeadsDiarieService };
