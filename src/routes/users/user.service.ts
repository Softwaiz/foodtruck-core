import { PrismaClient } from "../../../generated/prisma";

export class UserService  {
    constructor(private readonly client: PrismaClient) {}

    getUserById({id}: { id: string}) {
        return this.client.user.findFirst({
            where: {
                id: id
            }
        });
    }
}