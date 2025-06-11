import { z } from "zod";

export const MediaSchema = z.object({
    type: z.string(),
    name: z.string(),
    size: z.number()
});

export type MediaInput = z.infer<typeof MediaSchema>;