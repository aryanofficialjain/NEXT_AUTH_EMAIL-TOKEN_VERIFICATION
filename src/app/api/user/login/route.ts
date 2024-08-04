import  UserModel  from "@/app/models/UserModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { dbConnect } from "@/app/db/dbConnect";
import { sendEmail } from "@/app/helpers/mailer";

export  async function POST(request: NextRequest){

    await dbConnect();
    const reqBody = await request.json();
    const {email, password} = reqBody;

    if(!email && password){
        return NextResponse.json({message: "Fill up all the fields"}, {status: 404})
    }

    const user = await UserModel.findOne({email});

    if(!user){
        return NextResponse.json({message: "User is not found"}, {status: 404});
    }

    const checkpassword = await bcryptjs.compare(password, user.password);

    if(!checkpassword){
        return NextResponse.json({message: "Password is not Correct"});
    }

    

    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_SECRET)

    const response = NextResponse.json({mesage: "Login succesfull"}, {status: 200})
    response.cookies.set("token", token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60,

    })
    return response;
}