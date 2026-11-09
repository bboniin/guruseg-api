import prismaClient from "../../prisma";
import { GenerateSectorsFromFunctionsService } from "../IA/GenerateSectorsFromFunctionsService";
import { GetRisksService } from "../IA/GetRisksService";

interface ConvertRequest {
  preliminary_id: string;
  user_id?: string;
}

class ConvertPreliminaryToSurveyService {
  async execute({ preliminary_id, user_id }: ConvertRequest) {
    if (!preliminary_id) {
      throw new Error("ID do formulário preliminar não fornecido.");
    }

    const preliminary = await prismaClient.preliminaryCompany.findUnique({
      where: { id: preliminary_id },
      include: {
        functions: {
          orderBy: { create_at: "asc" },
        },
      },
    });

    if (!preliminary) {
      throw new Error("Formulário preliminar não encontrado.");
    }

    if (!preliminary.functions || preliminary.functions.length === 0) {
      throw new Error(
        "O formulário preliminar não possui nenhuma função cadastrada para gerar o levantamento."
      );
    }

    // 1. Usar a IA Especialista em Segurança do Trabalho para gerar os setores ideais
    const generateSectorsService = new GenerateSectorsFromFunctionsService();
    const sectorsGenerated = await generateSectorsService.execute({
      company: {
        razao_social: preliminary.razao_social || "",
        nome_fantasia: preliminary.nome_fantasia || "",
        ramo_atividade: preliminary.ramo_atividade || "",
        type: preliminary.type || "CNPJ",
      },
      functions: preliminary.functions,
    });

    // 2. Mapear e distribuir as funções do formulário preliminar em cada setor
    const unallocatedFunctions = [...preliminary.functions];
    const preparedSectors: Array<{
      name: string;
      description: string;
      functions: typeof preliminary.functions;
      risks: any[];
    }> = [];

    sectorsGenerated.forEach((sec) => {
      const assignedFunctions: typeof preliminary.functions = [];

      (sec.function_names || []).forEach((funcName) => {
        const normalizedTarget = funcName.trim().toLowerCase();
        const foundIndex = unallocatedFunctions.findIndex(
          (f) =>
            f.name.trim().toLowerCase() === normalizedTarget ||
            normalizedTarget.includes(f.name.trim().toLowerCase()) ||
            f.name.trim().toLowerCase().includes(normalizedTarget)
        );

        if (foundIndex >= 0) {
          assignedFunctions.push(unallocatedFunctions[foundIndex]);
          unallocatedFunctions.splice(foundIndex, 1);
        }
      });

      preparedSectors.push({
        name: sec.name,
        description: sec.description,
        functions: assignedFunctions,
        risks: [],
      });
    });

    // Se alguma função não foi mapeada pelo nome exato, alocar no primeiro setor disponível
    if (unallocatedFunctions.length > 0) {
      if (preparedSectors.length > 0) {
        preparedSectors[0].functions.push(...unallocatedFunctions);
      } else {
        preparedSectors.push({
          name: "Operacional",
          description:
            "Ambiente operacional para execução das atividades e rotinas da empresa.",
          functions: [...unallocatedFunctions],
          risks: [],
        });
      }
    }

    // Garantir que nenhum setor fique completamente vazio sem funções
    const filteredSectors = preparedSectors.filter(
      (sec) => sec.functions.length > 0
    );

    const finalSectors =
      filteredSectors.length > 0 ? filteredSectors : preparedSectors;

    // 3. Para cada setor criado, buscar os riscos oficiais na lista usando GetRisksService
    const getRisksService = new GetRisksService();

    await Promise.all(
      finalSectors.map(async (sector) => {
        try {
          const occupationsStr = sector.functions.map((f) => f.name).join(", ");
          const risks = await getRisksService.execute({
            sector: sector.name,
            description: sector.description,
            occupations: occupationsStr,
          });

          sector.risks = Array.isArray(risks) ? risks : [];
        } catch (error) {
          console.error(
            `Erro ao buscar riscos para o setor "${sector.name}":`,
            error
          );
          sector.risks = [];
        }
      })
    );

    // 4. Criar a Empresa de Levantamento (Company) no banco de dados
    const effectiveUserId =
      user_id ||
      preliminary.collaborador_id ||
      "";

    const company = await prismaClient.company.create({
      data: {
        razao_social: preliminary.razao_social || "",
        nome_fantasia:
          preliminary.nome_fantasia || preliminary.razao_social || "",
        cnpj: preliminary.cnpj || "",
        ramo_atividade: preliminary.ramo_atividade || "",
        cep: preliminary.cep || "",
        endereco: preliminary.endereco || "",
        nome_responsavel: preliminary.nome_responsavel || "",
        cpf_responsavel: preliminary.cpf_responsavel || "",
        contato_responsavel: preliminary.contato_responsavel || "",
        observation: preliminary.observation || "",
        type: preliminary.type || "CNPJ",
        status: "aguardando",
        collaborador_id: effectiveUserId,
      },
    });

    // 5. Persistir cada Setor com suas Funções (Employees) e Riscos (Scratchs)
    for (const sec of finalSectors) {
      const createdSector = await prismaClient.companySector.create({
        data: {
          company_id: company.id,
          name: sec.name,
          description: sec.description,
        },
      });

      // Funções
      for (const func of sec.functions) {
        await prismaClient.companyEmployees.create({
          data: {
            company_sector_id: createdSector.id,
            name: func.name,
            cbo: func.cbo ? String(func.cbo).trim() : "",
            quantidade_colaboradores:
              Number(func.quantidade_colaboradores) || 1,
            quantidade_colaboradores_m:
              Number(func.quantidade_colaboradores_m) || 0,
            quantidade_colaboradores_f:
              Number(func.quantidade_colaboradores_f) || 0,
            description: func.description || "",
            epis: func.epis || "",
          },
        });
      }

      // Riscos
      for (const risk of sec.risks) {
        await prismaClient.companyScratchs.create({
          data: {
            company_sector_id: createdSector.id,
            name: risk.name || "Ausência de Fator de Risco",
            type: risk.type || risk.tipo || "Não Especificado",
            description: risk.description || "",
            fonte_geradora: risk.fonte_geradora || "",
            perigos: risk.perigos || "",
            probabilidade: risk.probabilidade || "",
            efeito: risk.efeito || "",
            epis: risk.epis || "",
            tempo_exposicao: risk.tempo_exposicao || "",
            tipo_exposicao: risk.tipo_exposicao || "",
            epcs: risk.epcs || "",
            medidas_controle: risk.medidas_controle || "",
          },
        });
      }
    }

    // 6. Atualizar status do formulário preliminar para 'confirmado'
    await prismaClient.preliminaryCompany.update({
      where: { id: preliminary_id },
      data: {
        status: "confirmado",
      },
    });

    return {
      company_id: company.id,
      company,
      sectors_count: finalSectors.length,
      functions_count: preliminary.functions.length,
      message:
        "Formulário de levantamento gerado com sucesso a partir do formulário preliminar.",
    };
  }
}

export { ConvertPreliminaryToSurveyService };
