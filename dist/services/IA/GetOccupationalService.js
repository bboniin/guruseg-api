"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetOccupationalService = void 0;
var _openai = _interopRequireDefault(require("openai"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetOccupationalService {
  async execute({
    name
  }) {
    if (!name) {
      throw new Error("Preencher a função para buscar mais detalhes");
    }
    const client = new _openai.default();
    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Você é um assistente que retorna informações sobre ocupações de trabalho no Brasil.

Sempre responda **exatamente** neste formato JSON:
{
  "name": "Nome da função com iniciais maiúsculas",
  "cbo": "cbo": "O código CBO oficial com 6 dígitos (Ex: 2122-05 para Engenheiro de Software)",
  "description": "Resumo da atividade principal da função.",
  "epis": EPI 1, EPI 2, EPI 3...
}

Evite variações. Não inclua explicações, apenas o JSON válido.

A função é ${name}`
    });
    return JSON.parse(response.output_text);
  }
}
exports.GetOccupationalService = GetOccupationalService;