import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import {usernameValidation} from "@/schemas/signUpSchema";

const UserNameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {

    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username : searchParams.get("username")}
        //validaTE
        const result = UserNameQuerySchema.safeParse(queryParam)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: usernameErrors[0] || "Invalid username"
                },
                {status: 400}
            )
             
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username})

        if(existingVerifiedUser){
            return Response.json(
                {
                    success: false,
                    message: "Username already exists"
                },
                {status: 400}
            )  
        }
        return Response.json(
            {
                success: true,
                message: "Username is Unique"
            },
            {status: 400}
        )

    } catch (error) {
        console.error("Error checking username",error)
        return Response.json(
            {
                success: false,
                message: "Something went wrong"
            },
            {status: 500}
        )
        
    }
}