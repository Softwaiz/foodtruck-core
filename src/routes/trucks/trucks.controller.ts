import { Request, Response, Router } from "express";
import { Controller } from "../../core";
import { NotFoundError } from "../../errors/not-found.error";
import { TrucksService } from "./trucks.service";
import { Prisma } from "../../../generated/prisma";

export class TruckController implements Controller {

    mount(router: Router) {
        return router.get('/:truckId', this.getTruck)
    }

    async getTruck(request: Request, response: Response) {
        let truckID = request.params.truckId;
        if (!truckID) {
            throw new NotFoundError({
                message: "Truck not found"
            });
        }

        let withOwner = request.query.includeOwner === "true";

        let service = new TrucksService(request.db);

        let include: Prisma.TruckInclude | undefined = undefined;

        if (withOwner) {
            include = {
                owner: {
                    omit: {
                        password: true,
                        createdAt: true,
                        email: true
                    }
                }
            }
        }

        let truck = await service.getTruckById({ id: truckID, include });

        if (!truck) {
            throw new NotFoundError({
                message: "Truck not found"
            });
        }

        return response.status(200).json(truck);
    }

}