"use strict";

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _routes = require("./routes");

var _FinishedOSsService = require("./services/Order/FinishedOSsService");

var _ExpireContractsService = require("./services/Contract/ExpireContractsService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_routes.router);
app.use(function (req, res, next) {
  req.connection.setNoDelay(true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "https://app.gurusegead.com.br");
  res.header('Access-Control-Expose-Headers', 'agreementrequired');
  next();
});
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal serve error'
  });
});

_nodeCron.default.schedule("0 8,12,16,20 * * *", () => {
  const finalizeOSs = new _FinishedOSsService.FinishedOSsService();
  finalizeOSs.execute();
});

_nodeCron.default.schedule("0 8,12,16,20 * * *", () => {
  const expireContracts = new _ExpireContractsService.ExpireContractsService();
  expireContracts.execute();
});

app.listen(3333, () => console.log("rodando v31"));