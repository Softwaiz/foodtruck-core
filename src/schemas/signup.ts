import {z} from 'zod';

export const SignupSchema = z.object({
    firstName: z.string().max(32),
    lastName: z.string().max(32),
    email:  z.string().email(),
    password: z.string().min(8).max(32)
});


export type SignupInput = z.infer<typeof SignupSchema>;

