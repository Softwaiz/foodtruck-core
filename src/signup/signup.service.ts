import { PrismaClient } from "../../generated/prisma";
import { PasswordService } from "../password/password.service";
import { SignupInput } from "../schemas/signup";
import { CreateTruckInput } from "../schemas/truck";

export class SignupService {

    constructor(private client: PrismaClient) { }

    async findUserByEmail({ email }: { email: string }) {
        return this.client.user.findFirst({
            where: {
                email: email
            }
        });
    }

    async createCustomerAccount({ data }: { data: SignupInput }) {
        let service = new PasswordService();
        let hashedPassword = service.sign(data.password);

        let createdUser = await this.client.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword
            }
        });

        return createdUser;
    }


    async createCompanyAccount({ data }: { data: CreateTruckInput }) {
        let owner = await this.createCustomerAccount({ data: data.owner });
        let createdUser = await this.client.truck.create({
            data: {
                name: data.name,
                logo: data.logo,
                description: data.description,
                cuisineType: data.cuisineType,
                phoneNumber: data.phoneNumber,
                website: data.website,
                ownerId: owner.id
            }
        });

        return createdUser;
    }

    async findCompanyByName({ name }: { name: string }) {
        let company = await this.client.truck.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive"
                }
            }
        });

        return company;
    }

}