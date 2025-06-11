import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../core";
import { TruckLocationSchema } from "../../schemas/location";
import { ValidationError } from "../../errors/validation.error";
import { AuthenticationError } from "../../errors/authentication.error";
import { TruckLocationService } from "./location.service";
import { NotFoundError } from "../../errors/not-found.error";

export class TruckLocationController implements Controller {

    mount(router: Router): Router {
        return router
            .use(this.useAuth)
            .post("/", this.create)
            .get("/", this.listTruckLocations)
            .get("/latest", this.getLatestTruckPosition);
    }

    useAuth(request: Request, response: Response, next: NextFunction) {
        let user = request.user;
        if (!request.user) {
            throw new AuthenticationError();
        }
        next();
    }

    async listTruckLocations(request: Request, response: Response) {
        const service = new TruckLocationService(request.db);
        let truckID = request.params.truckId;
        let truck = await service.getTruckById(truckID);
        if (!truck) {
            throw new NotFoundError({
                message: "Truck not found"
            });
        }
        let page = parseInt(request.query.page as unknown as string) || 1;
        let size = parseInt((request.query.size ?? "") as unknown as string) || 10;

        let result = await service.getTruckPositions({
            truckId: truck.id,
            size,
            page
        });

        return response.status(200).json(result);
    }

    async getLatestTruckPosition(request: Request, response: Response) {
        const service = new TruckLocationService(request.db);
        let truckID = request.params.truckId;
        let truck = await service.getTruckById(truckID);
        if (!truck) {
            throw new NotFoundError({
                message: "Truck not found"
            });
        }

        let position = await service.getLastTruckPosition(truckID);
        if (!position) {
            throw new NotFoundError({
                message: "No Location known for this truck"
            });
        }

        return response.status(200).json(position);
    }

    async create(request: Request, response: Response) {
        let body = request.body;
        let user = request.user;

        const service = new TruckLocationService(request.db);
        let truck = await service.getTruckById(request.params.truckId);

        if (!truck) {
            throw new NotFoundError({
                message: "Truck not found"
            });
        }

        if (truck?.ownerId !== user?.id) {
            throw new NotFoundError({
                message: "Truck not found"
            });
        }

        let validated = TruckLocationSchema.safeParse(body);
        if (!validated.success) {
            throw new ValidationError({
                message: "Please update your input"
            });
        }

        const location = service.createLocation({
            truck: truck,
            location: validated.data
        });

        return response.status(201).json(location);
    }

    


}