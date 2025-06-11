import { Router } from "express";
import { Controller } from "../core";

export class TruckController implements Controller {

    mount(router: Router) {
        return router;
    }
    
}