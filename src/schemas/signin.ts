import {z} from 'zod';

export const SigninSchema = z.object({
    email:  z.string().email(),
    password: z.string().min(8).max(32)
});


export type SigninInput = z.infer<typeof SigninSchema>;