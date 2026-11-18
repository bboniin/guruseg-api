"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSSTDiagnosticController = void 0;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../utils/auth"));
var _GetSSTDiagnosticService = require("../../services/SSTDiagnostic/GetSSTDiagnosticService");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class GetSSTDiagnosticController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    let userId = req.userId;
    if (!userId && req.headers.authorization) {
      try {
        const authToken = req.headers.authorization;
        const [, token] = authToken.split(" ");
        const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
        userId = decoded.sub;
      } catch (err) {
        // Token inválido ou expirado em rota pública
      }
    }
    const getService = new _GetSSTDiagnosticService.GetSSTDiagnosticService();
    const result = await getService.execute({
      id,
      userId
    });
    return res.json(result);
  }
}
exports.GetSSTDiagnosticController = GetSSTDiagnosticController;