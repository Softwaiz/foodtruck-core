import { PrismaClient } from "../../../generated/prisma";
import { Cursor } from "../../core/pagination";
import { EarthPoint } from "../../proximity/proximity.service";

export class SearchService {

    constructor(private readonly client: PrismaClient) { }

    async search({ name, cuisineType, size = 10, page = 1, near, radius }: {
        size?: number;
        page?: number;
        name?: string,
        cuisineType?: string,
        near?: EarthPoint,
        radius?: number
    }) {

        let count = await this.client.truck.count({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                },
                cuisineType: cuisineType
            }
        });

        const cursor = new Cursor(size, page, count);
        let pagination = cursor.compute();

        let items = await this.client.truck.count({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                },
                cuisineType: cuisineType
            },
            take: pagination.size,
            skip: pagination.offset
        });

        return { items, pagination };
    }

}