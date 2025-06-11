import { Application, Router } from "express";
import { SigninController } from "./signin/signin.controller";
import { SignupController } from "./signup/signup.controller";
import { TruckController } from "./trucks/trucks.controller";
import { Controller } from "../core";
import { TruckLocationController } from "./locations/location.controller";
import { UserController } from "./users/user.controller";
import { SearchController } from "./search/search.controller";

export function setupRoutes(app: Application) {
    const controllers: [first: string, last: Controller][] = [
        ["/auth/signin", new SigninController()],
        ["/auth/signup", new SignupController()],
        ["/users", new UserController()],
        ["/trucks", new TruckController()],
        ["/search", new SearchController()],
        ["/trucks/:truckId/locations", new TruckLocationController()]
    ];
    
    controllers.forEach(([path, controller]) => {
        let router = Router();
        controller.mount(router);
        app = app.use(path, router);
    });
    return app;
}