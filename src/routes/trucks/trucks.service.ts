import { Prisma, PrismaClient } from "../../../generated/prisma";

export class TrucksService {
    constructor(private readonly client: PrismaClient) { }

    async getTruckById({id, include} : { id: string, include?: Prisma.TruckInclude }) {
        return this.client.truck.findFirst({
            where: {
                id: id
            },
            include
        });
    }

}