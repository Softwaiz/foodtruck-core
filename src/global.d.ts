import { PrismaClient, User } from "../generated/prisma";

declare module "express-serve-static-core" {
    interface Request {
        user?: User;
        db: PrismaClient;
    }
}

declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV?: 'development' | 'production' | 'test';
            PORT: string;
            DATABASE_URL: string;
            JWT_SECRET: string;
            SALT_ROUNDS: string;
        }
    }
}