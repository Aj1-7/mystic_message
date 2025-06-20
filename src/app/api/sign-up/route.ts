
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    console.log(Request);

    try {
        const {username,email,password} = await request.json()
        const existingUserVerificationByUsername = await UserModel.findOne({ 
            username,
            isVerified: true
        })
        
        if (existingUserVerificationByUsername) {
            return Response.json({
                success:false,
                message: "Username already exists. Please choose a different username.",

            
        },{status: 400})
    }

    const existingUserByEmail = await UserModel.findOne({email})
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
        if (existingUserByEmail.isVerified) {
            return Response.json({
                success:false,
                message: "User already exists.Please Login",
            },{status: 400})
        }else{
            const hashedpassword = await bcrypt.hash(password,10)
            existingUserByEmail.password = hashedpassword
            existingUserByEmail.verifyCode = verifyCode
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserByEmail.save() 

        }
    }else{
        const hashedpassword = await bcrypt.hash(password,10)
        
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry date to 1 day from now
        const newUser = new UserModel({
                username,
                email,
                password: hashedpassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptedMessage:true,
                message:[],
            })
            await newUser.save()

    }
    //send verification
    const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode,
    )
    if(!emailResponse){
        return Response.json({
            success:false,
            message: "Email verification failed. Please try again later.",
        },{status: 500})
    }

    return Response.json({
        success:true,
        message: "Sent successfully. Please check your email for verification.",
    },{status: 201})
        

        
    } catch (error) {
        console.error("Error in sign-up route:", error);
        return Response.json({
            success: false,
            message: "An error occurred during sign-up. Please try again later.",
        }, { status: 500 });
    }
}