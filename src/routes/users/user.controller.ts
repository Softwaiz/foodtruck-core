import { Request, Response, Router } from "express";
import { Controller } from "../../core";
import { AuthenticationError } from "../../errors/authentication.error";
import { UserService } from "./user.service";
import { NotFoundError } from "../../errors/not-found.error";

export class UserController implements Controller {
    mount(router: Router) {
        return router.get("/:userId", this.getUserById);
    }

    async getUserById(request: Request, response: Response) {
        let user = request.user;
        let userId = request.params.userId;

        if (!user) {
            throw new AuthenticationError({
                message: "Please login first."
            });
        }

        if (userId.toLowerCase() === "me") {
            return user;
        }

        let service = new UserService(request.db);
        let fetchedUser = await service.getUserById({ id: userId });

        if(!fetchedUser) {
            throw new NotFoundError({
                message: "User not found."
            });
        }

        return response.status(200).json(fetchedUser);
    }
}