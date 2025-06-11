import { Request, Response, Router } from "express";
import { Controller } from "../../core";
import { SignupSchema } from "../../schemas/signup";
import { ValidationError } from "../../errors/validation.error";
import { SignupService } from "./signup.service";
import { DuplicationError } from "../../errors/duplication.error";
import { CreateTruckSchema } from "../../schemas/truck";

export class SignupController implements Controller {

    mount(router: Router) {
        return router.post("/", this.signup)
            .post("/company", this.signupAsTruckCompany);
    }

    async signup(request: Request, response: Response) {

        let validated = SignupSchema.safeParse(request.body);
        if (!validated.success) {
            throw new ValidationError({
                message: "Pease correct your data",
                input: validated.error.flatten().fieldErrors,
            });
        }

        let service = new SignupService(request.db);
        let existentUser = await service.findUserByEmail({ email: validated.data.email });
        if (existentUser) {
            throw new DuplicationError({
                message: "A user with similar email already exists."
            });
        }

        let created = await service.createCustomerAccount({ data: validated.data });
        return response.status(201).send(created);
    }

    async signupAsTruckCompany(request: Request, response: Response) {

        let validated = CreateTruckSchema.safeParse(request.body);
        if (!validated.success) {
            throw new ValidationError({
                message: "Pease correct your data",
                input: validated.error.flatten().fieldErrors,
            });
        }

        let service = new SignupService(request.db);
        let existentUser = await service.findUserByEmail({ email: validated.data.owner.email });
        if (existentUser) {
            throw new DuplicationError({
                message: "A user with similar email already exists."
            });
        }

        let existent = await service.findCompanyByName({ name: validated.data.name });
        if (existent) {
            throw new DuplicationError({
                message: "A truck company with similar name already exists."
            });
        }

        let created = await service.createCompanyAccount({ data: validated.data });
        response.status(201).send(created);
    }

}