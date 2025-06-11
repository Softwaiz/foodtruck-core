import { z } from "zod";

export const TruckLocationSchema = z.object({
    latitude: z.number(), 
    longitude: z.number()
});

export type TruckLocationInput = z.infer<typeof TruckLocationSchema>;