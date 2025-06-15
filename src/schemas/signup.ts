import {z} from 'zod';

export const SignupSchema = z.object({
    firstName: z.string().max(32, "First name must be at most 32 characters long"),
    lastName: z.string().max(32, "Last name must be at most 32 characters long"),
    email:  z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "The password length should not be less than 8 chars").max(32, "The password length should not be more than 32 chars")
});


export type SignupInput = z.infer<typeof SignupSchema>;

