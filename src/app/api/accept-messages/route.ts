import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "next-auth"
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user = session?.user

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not authenticated"

            },{status: 401}
        )
    }
    const userID = user._id;
    const {acceptMessages} = await request.json()
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userID, {isAcceptingMessage: acceptMessages}, {new: true})
        if (!updatedUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"

                },{status: 401}
            )
        }
        return Response.json(
            {
                success: true,
                message: "Message acceptance status updated successfully"

            },{status: 401}
        )
    }catch (error) {
        console.log("failed to update user")
        return Response.json(
            {
                success: false,
                message: "failed to update user"

            },{status: 500}
        )
        
    }
}

export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user = session?.user

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not authenticated"

            },{status: 401}
        )
    }
    const userID = user._id;

    try {
        const foundUser = await UserModel.findById(userID)
        if (!foundUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
    
                },{status: 404}
            )
        }
        return Response.json(
            {
                success: true,
                isAcceptingMessages: foundUser.isAcceptedMessage
    
            },{status: 200}
        )
    } catch (error) {
        console.log("failed to update user")
        return Response.json(
            {
                success: false,
                message: "error in getting user"

            },{status: 500}
        )
        
    }

}