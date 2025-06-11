import { PrismaClient, Truck } from "../../../generated/prisma";
import { Cursor } from "../../core/pagination";
import { TruckLocationInput } from "../../schemas/location";

export class TruckLocationService {

    constructor(private readonly client: PrismaClient) {
    }

    async getTruckById(id: string) {
        return this.client.truck.findFirst({
            where: {
                id: id
            }
        });
    }

    async createLocation({ truck, location }: { truck: Truck, location: TruckLocationInput }) {
        return this.client.truckLocation.create({
            data: {
                latitude: location.latitude,
                longitude: location.latitude,
                truck: {
                    connect: {
                        id: truck.id
                    }
                },
                timestamp: new Date()
            }
        });
    }

    async getLastTruckPosition(truckId: string) {
        return this.client.truckLocation.findFirst({
            where: {
                truckId: truckId
            },
            orderBy: {
                timestamp: "desc"
            }
        });
    }

    async getTruckPositions({ truckId, size = 10, page = 1 }: { truckId: string, page?: number, size?: number }) {
        let count = await this.client.truckLocation.count({
            where: {
                truckId: truckId
            },
            orderBy: {
                timestamp: "desc"
            }
        });

        let cursor = new Cursor(size, page, count);
        let pagination = cursor.compute()

        let items = await this.client.truckLocation.findFirst({
            where: {
                truckId: truckId
            },
            orderBy: {
                timestamp: "desc"
            },
            take: pagination.size,
            skip: pagination.offset
        });

        return  {
            items: items,
            pagination
        }
    }
}