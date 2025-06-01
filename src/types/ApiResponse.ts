import { Message } from "@/model/User";
export type ApiResponse<T> = {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>
}
