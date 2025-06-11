import { z } from "zod";
import { MediaSchema } from "./media";
import { SignupSchema } from "./signup";

export const CreateTruckSchema = z.object({
    logo: MediaSchema.optional(),
    name: z.string().max(21),
    description: z.string(),
    cuisineType: z.string(),
    phoneNumber: z.string(),
    website: z.string().optional().default(""),
    owner: SignupSchema,
});

export type CreateTruckInput = z.infer<typeof CreateTruckSchema>;