import { NextFunction, Request, Response } from "express";
import { ValidationError } from "./validation.error";
import { DuplicationError } from "./duplication.error";
import { NotFoundError } from "./not-found.error";
import { AuthenticationError } from "./authentication.error";

export class DefaultErrorHandler {
    use(err: Error, request: Request, response: Response, next: NextFunction) {
        if(err instanceof ValidationError) {
            return response.status(err.statusCode).json(err.json);
        }
        if(err instanceof DuplicationError) {
            return response.status(err.statusCode).json(err.json);
        }
        if(err instanceof NotFoundError) {
            return response.status(err.statusCode).json(err.json);
        }
        if(err instanceof AuthenticationError) {
            return response.status(err.statusCode).json(err.json);
        }
        return response.status(500).json({ message: err.message, });
    }
}