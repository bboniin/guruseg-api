"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditLeadMatrizService = void 0;
var _prisma = _interopRequireDefault(require("../../prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EditLeadMatrizService {
  async execute({
    id,
    name,
    email,
    phone_number,
    observation,
    employees,
    cnpj,
    value,
    price,
    necessity,
    location,
    status,
    tag,
    user_id,
    contract_id
  }) {
    if (!id) {
      throw new Error("ID do lead é obrigatório.");
    }
    const leadExists = await _prisma.default.leadMatriz.findUnique({
      where: {
        id
      }
    });
    if (!leadExists) {
      throw new Error("Lead da matriz não encontrado.");
    }
    const leadMatriz = await _prisma.default.leadMatriz.update({
      where: {
        id
      },
      data: {
        ...(name !== undefined && {
          name
        }),
        ...(email !== undefined && {
          email
        }),
        ...(phone_number !== undefined && {
          phone_number
        }),
        ...(observation !== undefined && {
          observation
        }),
        ...(employees !== undefined && {
          employees
        }),
        ...(cnpj !== undefined && {
          cnpj
        }),
        ...(value !== undefined && {
          value
        }),
        ...(price !== undefined && {
          price
        }),
        ...(necessity !== undefined && {
          necessity
        }),
        ...(location !== undefined && {
          location
        }),
        ...(status !== undefined && {
          status
        }),
        ...(tag !== undefined && {
          tag
        }),
        ...(user_id !== undefined && {
          user_id
        }),
        ...(contract_id !== undefined && {
          contract_id
        }),
        update_at: new Date()
      }
    });
    return leadMatriz;
  }
}
exports.EditLeadMatrizService = EditLeadMatrizService;