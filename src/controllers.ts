import { Application, Router } from "express";
import { SigninController } from "./signin/signin.controller";
import { SignupController } from "./signup/signup.controller";
import { TruckController } from "./trucks/trucks.controller";
import { Controller } from "./core";

export function mountControllers(app: Application) {

    const controllers: [first: string, last: Controller][] = [
        ["/auth/signin", new SigninController()],
        ["/auth/signup", new SignupController()],
        ["/trucks", new TruckController()]
    ];

    controllers.forEach((definition) => {
        let [path, controller] = definition;
        let router = Router();
        controller.mount(router);
        app = app.use(path, router);
    });

    return app;
}