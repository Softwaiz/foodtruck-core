import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AuthIdentity } from "../core";
import { IdentityService } from "../identity/identity.service";

export class AuthMiddleware {


    async use(request: Request, response: Response, next: NextFunction) {
        try {
            const authorization = request.headers.authorization;
            if (authorization) {
                let [type, token] = authorization.split(" ");

                if (type.toLowerCase() === "bearer") {
                    // We only support bearer tokens for the moment
                    token = token.trim();
                    let service = new IdentityService();
                    let payload = service.verify(token);

                    if (payload.uid) {
                        let user = await request.db.user.findFirst({
                            where: {
                                id: payload.uid
                            }
                        });

                        if (user) {
                            request.user = user;
                            return;
                        }
                    }
                }
            }
        }
        catch (err) {
            console.log("[AuthMiddleware] failed to decode access token", err);
        }
        finally {
            next();
        }
    }

}