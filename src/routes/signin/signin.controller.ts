import { Request, Response, Router } from "express";
import { Controller } from "../../core";
import { SigninSchema } from "../../schemas/signin";
import { ValidationError } from "../../errors/validation.error";
import { SigninService } from "./signin.service";
import { NotFoundError } from "../../errors/not-found.error";
import { PasswordService } from "../../password/password.service";
import { IdentityService } from "../../identity/identity.service";

export class SigninController implements Controller {

    mount(router: Router) {
        return router
        .post("/", this.signin);
    }

    async signin(request: Request, response: Response) {
        let validated = SigninSchema.safeParse(request.body);
        if (!validated.success) {
            throw new ValidationError({
                message: "Please correct your data",
                input: validated.error.flatten().fieldErrors,
            });
        }
        let signinService = new SigninService(request.db);
        let foundUser = await signinService.findUserByEmail({ email: validated.data.email });
        if (!foundUser) {
            throw new NotFoundError({
                message: "User not found"
            });
        }
        let passwordService = new PasswordService();
        if (!passwordService.isEqual(validated.data.password, foundUser.password)) {
            throw new NotFoundError({
                message: "User not found."
            });
        }

        let identityService = new IdentityService();
        let accessToken = identityService.sign(foundUser.id);

        return response.status(200).json({ accessToken });
    }
}