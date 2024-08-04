import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    
    const response = NextResponse.json({message: "Logout Succesfully"});
    response.cookies.set("token", "", {path: "/"})

    return response
}