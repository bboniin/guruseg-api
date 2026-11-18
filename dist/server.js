"use strict";

var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _cors = _interopRequireDefault(require("cors"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
var _routes = require("./routes");
var _ExpireContractsService = require("./services/Contract/ExpireContractsService");
var _InactiveLeadsService = require("./services/Lead/InactiveLeadsService");
var _EmailRemindersService = require("./services/Reminder/EmailRemindersService");
var _SendMessageTicketService = require("./services/Tickets/SendMessageTicketService");
var _OpenTicketService = require("./services/Tickets/OpenTicketService");
var _AcceptTicketService = require("./services/Tickets/AcceptTicketService");
var _ClosedTicketService = require("./services/Tickets/ClosedTicketService");
var _CreateTicketService = require("./services/Tickets/CreateTicketService");
var _CreateLeadsDiarieService = require("./services/Lead/CreateLeadsDiarieService");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const app = (0, _express.default)();
const server = _http.default.createServer(app);
const io = new _socket.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use(_express.default.json({
  limit: "50mb"
}));
app.use(_express.default.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use((0, _cors.default)());
app.use(_routes.router);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Expose-Headers", "agreementrequired");
  next();
});
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal serve error"
  });
});
_nodeCron.default.schedule("0 8,12,16,20 * * *", () => {
  const inactiveLeadsService = new _InactiveLeadsService.InactiveLeadsService();
  inactiveLeadsService.execute();
  const expireContracts = new _ExpireContractsService.ExpireContractsService();
  expireContracts.execute();
});
_nodeCron.default.schedule("0 8 * * *", () => {
  const emailReminderService = new _EmailRemindersService.EmailReminderService();
  emailReminderService.execute();
});
_nodeCron.default.schedule("50 23 * * 1-5", () => {
  const createLeadsDiarieService = new _CreateLeadsDiarieService.CreateLeadsDiarieService();
  createLeadsDiarieService.execute();
});
const connectedUsers = {};
io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  socket.data.userId = userId;
  if (!connectedUsers[userId]) {
    connectedUsers[userId] = socket.id;
  }
  next();
});
io.on("connection", socket => {
  const {
    userId
  } = socket.data;
  socket.on("sendMessage", async (data, ack) => {
    const {
      ticket_id,
      content,
      send_type
    } = data;
    const sendMessageTicketService = new _SendMessageTicketService.SendMessageTicketService();
    try {
      const message = await sendMessageTicketService.execute({
        ticket_id,
        content,
        userId: userId,
        send_type: send_type
      });
      ack({
        status: "ok",
        message: "Mensagem salva e enviada"
      });
      if (connectedUsers[message["received_id"]]) {
        const recipientSocketId = connectedUsers[message["received_id"]];
        io.to(recipientSocketId).emit("newMessage", message);
      }
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao enviar a mensagem."
      });
    }
    return;
  });
  socket.on("newChat", async (data, ack) => {
    const {
      content,
      send_type,
      order_id
    } = data;
    const openTicketService = new _OpenTicketService.OpenTicketService();
    try {
      const chat = await openTicketService.execute({
        content,
        userId: userId,
        send_type: send_type,
        order_id: order_id
      });
      ack({
        status: "ok",
        message: "Chamado aberto com sucesso"
      });
      io.emit("newChat", chat);
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao abrir chamado."
      });
    }
    return;
  });
  socket.on("createChat", async (data, ack) => {
    const {
      content,
      send_id,
      send_type,
      ticket_id
    } = data;
    const createTicketService = new _CreateTicketService.CreateTicketService();
    try {
      const chat = await createTicketService.execute({
        content,
        userId: userId,
        send_id: send_id,
        send_type: send_type,
        ticket_id: ticket_id
      });
      ack({
        status: "ok",
        message: "Chamado criado com sucesso",
        data: chat
      });
      if (connectedUsers[chat["received_id"]]) {
        const recipientSocketId = connectedUsers[chat["received_id"]];
        io.to(recipientSocketId).emit("createChat", chat);
      }
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao abrir chamado."
      });
    }
    return;
  });
  socket.on("acceptChat", async (data, ack) => {
    const {
      ticket_id
    } = data;
    const acceptTicketService = new _AcceptTicketService.AcceptTicketService();
    try {
      const chat = await acceptTicketService.execute({
        userId: userId,
        ticket_id: ticket_id
      });
      ack({
        status: "ok",
        message: "Chamado aceito com sucesso"
      });
      io.emit("acceptChat", chat);
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao iniciar atendimento."
      });
    }
    return;
  });
  socket.on("closedChat", async (data, ack) => {
    const {
      ticket_id
    } = data;
    const closedTicketService = new _ClosedTicketService.ClosedTicketService();
    try {
      const chat = await closedTicketService.execute({
        userId: userId,
        ticket_id: ticket_id
      });
      ack({
        status: "ok",
        message: "Chamado finalizado com sucesso"
      });
      io.emit("closedChat", chat);
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao finalizar chamado."
      });
    }
    return;
  });
  socket.on("disconnect", () => {
    const userId = socket.data.userId;
    delete connectedUsers[userId];
  });
});
server.listen(3333, () => console.log("rodando v107"));