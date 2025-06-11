import { Request, Response, Router } from "express";
import { Controller } from "../../core";
import { SearchService } from "./search.service";
import { SearchSchema } from "../../schemas/search";
import { ValidationError } from "../../errors/validation.error";

export class SearchController implements Controller {

    mount(router: Router): Router {
        return router;
    }

    search(request: Request, response: Response) {
        let service = new SearchService(request.db);

        let { name, cuisine, page, size, radius, nearLng, nearLat } = request.query;

        let validated = SearchSchema.safeParse({
            name,
            cuisineType: cuisine,
            near: nearLng && nearLat ? { lng: parseFloat(nearLng as string), lat: parseFloat(nearLat as string) } : undefined,
            radius: parseInt(radius as string),
            size: parseInt(size as string),
            page: parseInt(page as string),
        });

        if (!validated.success) {
            throw new ValidationError({
                message: "Please fix your errors",
                input: validated.error.flatten().fieldErrors
            });
        }


        return service.search({
            size: validated.data.size,
            page: validated.data.page,
            name: validated.data.name,
            cuisineType: validated.data.cuisineType,
            near: validated.data.near,
            radius: validated.data.radius
        });
    }

}