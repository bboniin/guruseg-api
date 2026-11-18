"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertPreliminaryToSurveyController = void 0;
var _ConvertPreliminaryToSurveyService = require("../../services/PreliminaryCompany/ConvertPreliminaryToSurveyService");
var _jsonwebtoken = require("jsonwebtoken");
class ConvertPreliminaryToSurveyController {
  async handle(req, res) {
    const {
      company_id
    } = req.params;
    let userId = req.userId;

    // Se a rota for chamada sem passar pelo middleware isAuthenticated, tentar extrair token opcional
    if (!userId) {
      const authToken = req.headers.authorization;
      if (authToken) {
        const [, token] = authToken.split(" ");
        try {
          const {
            sub
          } = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET);
          userId = sub;
        } catch {
          // Token inválido ou expirado, segue sem userId
        }
      }
    }
    const convertService = new _ConvertPreliminaryToSurveyService.ConvertPreliminaryToSurveyService();
    const result = await convertService.execute({
      preliminary_id: company_id,
      user_id: userId
    });
    return res.json(result);
  }
}
exports.ConvertPreliminaryToSurveyController = ConvertPreliminaryToSurveyController;