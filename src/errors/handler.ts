import { NextFunction, Request, Response } from "express";
import { ValidationError } from "./validation.error";

export class DefaultErrorHandler {
    use(err: Error, request: Request, response: Response, next: NextFunction) {
        if(err instanceof ValidationError) {
            return response.status(err.statusCode).json(err.json);
        }
        return response.status(500).json({ message: err.message, });
    }
}