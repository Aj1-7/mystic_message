import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username is required" )
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/,"Username must contain only letters and numbers" );

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email("{message:Invalid email address}"),
    password: z.string().min(8, "{message:Password must be at least 8 characters long}"),
});


