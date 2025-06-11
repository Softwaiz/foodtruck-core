import { PrismaClient } from "../../generated/prisma";

export class SigninService {
    client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async findUserByEmail({ email }: { email: string }) {
        let user = await this.client.user.findFirst({
            where: {
                email: email
            }
        });
        return user;
    }

}