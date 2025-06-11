import * as jwt from "jsonwebtoken";
import { AuthIdentity } from "../core";

export class IdentityService {

    sign(uid: string) {
        let token = jwt.sign({ uid }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        return token;
    }

    verify(token: string) {
        let payload = jwt.verify(token, process.env.JWT_SECRET!) as unknown as AuthIdentity;
        return payload;
    }

}