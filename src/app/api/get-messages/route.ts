import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "next-auth"
import UserModel from "@/model/User";
import mongoose from "mongoose";

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
    const userID = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            {$match: {_id: userID}},
            {$unwind: '$messages'},
            {$sort: {'messages.createdAt': -1}},
            {$group: {_id: '$_id', messages: {$push: '$messages'}}}
             ])
            if (!user || user.length === 0){
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
                    messages: user[0].messages

                },{status: 200}
            )
        
    } catch (error) {
        
    }
    

}