import { z } from "zod";

export const signInSchema = z.object({
    identifier: z.string().length(8, "Verify code must be 6 characters long"),
    password: z.string().length(8, "Password must be 8 characters long"),
});

