import express, { Application } from "express";
import { config } from "dotenv";
import { setupRoutes } from "./routes";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { DefaultErrorHandler } from "./errors/handler";
import bodyParser from  "body-parser";
import { PrismaClient } from "../generated/prisma";


config();

const dbClient = new PrismaClient();

let app: Application = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    req.db = dbClient;
    next();
});

app.use(new AuthMiddleware().use);

app = setupRoutes(app)
.use(new DefaultErrorHandler().use);


app.listen(parseInt(process.env.PORT || ""), () => {
    console.log("[FT] Api Started on port ", process.env.PORT);
});