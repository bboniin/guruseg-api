import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'
import cors from 'cors'
import cron from "node-cron";

import { router } from "./routes";
import { FinishedOSsService } from "./services/Order/FinishedOSsService";
import { ExpireContractsService } from "./services/Contract/ExpireContractsService";

const app = express()

app.use(express.json())

app.use(cors())

app.use(router)

app.use(function (req, res, next) {
    req.connection.setNoDelay(true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "https://app.gurusegead.com.br");
    res.header('Access-Control-Expose-Headers', 'agreementrequired');
    next()
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal serve error'
    })
})

cron.schedule("0 8,12,16,20 * * *", () => {
    const finalizeOSs = new FinishedOSsService();
    finalizeOSs.execute();
});

cron.schedule("0 8,12,16,20 * * *", () => {
    const expireContracts = new ExpireContractsService();
    expireContracts.execute();
});

app.listen(3333, () => console.log("rodando v20"))