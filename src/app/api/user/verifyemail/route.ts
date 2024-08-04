import UserModel from "@/app/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/db/dbConnect";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({ message: "Token is not found" }, { status: 404 });
        }

        const user = await UserModel.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ message: "User not found or token expired" }, { status: 400 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error verifying email: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}