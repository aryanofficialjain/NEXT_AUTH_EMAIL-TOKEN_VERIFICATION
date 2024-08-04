import UserModel from "@/app/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const reqBody = request.json();
    const {password , email} :any = reqBody;

    const user = await UserModel.findOneAndUpdate({ email, password}, {new: true});

    if(!user){
        return NextResponse.json({message: "User not found"});
    }

    return NextResponse.json({message: "Password updated succesfully"}, {status: 200});
    
}