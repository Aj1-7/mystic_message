import { resend } from "../lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";
import { ca } from "zod/v4/locales";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string

): Promise<ApiResponse<null>> {
    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'Mystic Verification Code',
            react: VerificationEmail({
                username,
                otp: verifyCode,}),
        });
        return {
            success: true,
            message: "sent buddy",
        };

    } catch (error) {
        console.error("Error sending verification email:", error);
        return {
            success: false,
            message: "Failed to send verification email. Please try again later.",
        };
    }
}