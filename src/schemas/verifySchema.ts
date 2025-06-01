import { z } from "zod";

export const verifySchema = z.object({
    code: z.string().length(8, "Verify code must be 6 characters long"),
});


