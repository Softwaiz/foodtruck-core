import { z } from "zod";

export const EarthPointSchema = z.object({
    lat: z.number(),
    lng: z.number(),
});

export const SearchSchema = z.object({
    size: z.number().int().positive().max(100).optional().default(10),
    page: z.number().int().positive().optional().default(1),
    name: z.string().optional(),
    cuisineType: z.string().optional(),
    near: EarthPointSchema.optional(),
    radius: z.number().positive().optional(),
});

export type SearchInput = z.infer<typeof SearchSchema>;