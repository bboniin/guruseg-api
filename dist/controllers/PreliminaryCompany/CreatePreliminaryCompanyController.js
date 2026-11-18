"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePreliminaryCompanyController = void 0;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../utils/auth"));
var _CreatePreliminaryCompanyService = require("../../services/PreliminaryCompany/CreatePreliminaryCompanyService");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreatePreliminaryCompanyController {
  async handle(req, res) {
    const {
      razao_social,
      observation
    } = req.body;
    let userId = req.userId;
    if (!userId && req.headers.authorization) {
      try {
        const authToken = req.headers.authorization;
        const [, token] = authToken.split(" ");
        const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
        userId = decoded.sub;
      } catch (err) {
        // Ignore invalid token if optional
      }
    }
    const createService = new _CreatePreliminaryCompanyService.CreatePreliminaryCompanyService();
    const result = await createService.execute({
      razao_social,
      observation,
      userId
    });
    return res.json(result);
  }
}
exports.CreatePreliminaryCompanyController = CreatePreliminaryCompanyController;