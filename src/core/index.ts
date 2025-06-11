import { Application, Router } from "express";

export interface Controller {
    mount(router: Router): Router;
}

export interface AuthIdentity {
    uid: string;
}