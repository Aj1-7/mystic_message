import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now,
    },
    
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptedMessage:boolean;
    message:Message[];
}

const userSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        minlength: [8,"Password must be at least 8 characters long"],
    },
    verifyCode:{
        type: String,   
        required: [true,"Verify code is required"],
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true,"Verify code expiry is required"],
    },  
    isVerified:{
        type: Boolean,
        default: false,
    },

    isAcceptedMessage:{
        type: Boolean,
        default: false,
    },
    message:[messageSchema],    
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;
