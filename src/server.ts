import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import cron from "node-cron";
import http from "http";
import { Server } from "socket.io";

import { router } from "./routes";
import { ExpireContractsService } from "./services/Contract/ExpireContractsService";
import { InactiveLeadsService } from "./services/Lead/InactiveLeadsService";
import { EmailReminderService } from "./services/Reminder/EmailRemindersService";
import { SendMessageTicketService } from "./services/Tickets/SendMessageTicketService";
import { OpenTicketService } from "./services/Tickets/OpenTicketService";
import { AcceptTicketService } from "./services/Tickets/AcceptTicketService";
import { ClosedTicketService } from "./services/Tickets/ClosedTicketService";
import { CreateTicketService } from "./services/Tickets/CreateTicketService";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

app.use(cors());

app.use(router);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Expose-Headers", "agreementrequired");

  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal serve error",
  });
});

cron.schedule("0 8,12,16,20 * * *", () => {
  const inactiveLeadsService = new InactiveLeadsService();
  inactiveLeadsService.execute();

  const expireContracts = new ExpireContractsService();
  expireContracts.execute();
});

cron.schedule("0 8 * * *", () => {
  const emailReminderService = new EmailReminderService();
  emailReminderService.execute();
});

const connectedUsers = {};

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;

  console.log(userId);
  socket.data.userId = userId;

  if (!connectedUsers[userId]) {
    connectedUsers[userId] = socket.id;
  }

  next();
});

io.on("connection", (socket) => {
  const { userId } = socket.data;

  socket.on("sendMessage", async (data, ack) => {
    const { ticket_id, content, send_type } = data;
    const sendMessageTicketService = new SendMessageTicketService();

    try {
      const message = await sendMessageTicketService.execute({
        ticket_id,
        content,
        userId: userId,
        send_type: send_type,
      });
      ack({
        status: "ok",
        message: "Mensagem salva e enviada",
      });

      if (connectedUsers[message["received_id"]]) {
        const recipientSocketId = connectedUsers[message["received_id"]];
        io.to(recipientSocketId).emit("newMessage", message);
      }
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao enviar a mensagem.",
      });
    }
    return;
  });

  socket.on("newChat", async (data, ack) => {
    const { content, send_type, order_id } = data;
    const openTicketService = new OpenTicketService();

    try {
      const chat = await openTicketService.execute({
        content,
        userId: userId,
        send_type: send_type,
        order_id: order_id,
      });
      ack({
        status: "ok",
        message: "Chamado aberto com sucesso",
      });

      io.emit("newChat", chat);
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao abrir chamado.",
      });
    }
    return;
  });

  socket.on("createChat", async (data, ack) => {
    const { content, send_id, send_type, ticket_id } = data;
    const createTicketService = new CreateTicketService();

    try {
      const chat = await createTicketService.execute({
        content,
        userId: userId,
        send_id: send_id,
        send_type: send_type,
        ticket_id: ticket_id,
      });
      ack({
        status: "ok",
        message: "Chamado criado com sucesso",
        data: chat,
      });

      if (connectedUsers[chat["received_id"]]) {
        const recipientSocketId = connectedUsers[chat["received_id"]];
        io.to(recipientSocketId).emit("createChat", chat);
      }
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao abrir chamado.",
      });
    }
    return;
  });

  socket.on("acceptChat", async (data, ack) => {
    const { ticket_id } = data;
    const acceptTicketService = new AcceptTicketService();

    try {
      const chat = await acceptTicketService.execute({
        userId: userId,
        ticket_id: ticket_id,
      });
      ack({
        status: "ok",
        message: "Chamado aceito com sucesso",
      });

      io.emit("acceptChat", chat);
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao iniciar atendimento.",
      });
    }
    return;
  });

  socket.on("closedChat", async (data, ack) => {
    const { ticket_id } = data;
    const closedTicketService = new ClosedTicketService();

    try {
      const chat = await closedTicketService.execute({
        userId: userId,
        ticket_id: ticket_id,
      });
      ack({
        status: "ok",
        message: "Chamado finalizado com sucesso",
      });

      io.emit("closedChat", chat);
    } catch (error) {
      ack({
        status: "error",
        message: error?.message || "Falha interna ao finalizar chamado.",
      });
    }
    return;
  });

  socket.on("disconnect", () => {
    const userId = socket.data.userId;
    delete connectedUsers[userId];
  });
});

server.listen(3333, () => console.log("rodando v77"));
