import { dbConnect } from "@/app/db/dbConnect";
import { sendEmail } from "@/app/helpers/mailer";
import UserModel from "@/app/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await dbConnect();
    try {
        const reqBody = await request.json(); // Await the JSON parsing
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "No user found" }, { status: 404 });
        }

        await sendEmail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({ message: "Mail has been sent to the user" }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}