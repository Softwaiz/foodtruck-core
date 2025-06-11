import express, { Application } from "express";
import { config } from "dotenv";
import { mountControllers } from "./controllers";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { DefaultErrorHandler } from "./errors/handler";

config();

let app: Application = express();
app.use(new AuthMiddleware().use);

app = mountControllers(app)
.use(new DefaultErrorHandler().use);


app.listen(parseInt(process.env.PORT || ""), () => {
    console.log("[FT] Api Started on port ", process.env.PORT);
});