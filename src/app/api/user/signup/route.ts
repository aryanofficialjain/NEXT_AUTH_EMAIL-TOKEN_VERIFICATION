import { dbConnect } from "@/app/db/dbConnect";
import { sendEmail } from "@/app/helpers/mailer";
import  UserModel  from "@/app/models/UserModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  const reqBody = await request.json();
  const { email, password, name } = reqBody;

  if (!email && !password && !name) {
    return NextResponse.json({ message: "Fill up all fields" });
  }

  const user = await UserModel.findOne({ email });

  if (user) {
    return NextResponse.json(
      { message: "User is already Exits " },
      { status: 501 }
    );
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(password, salt);

  const newuser = new UserModel({
    name,
    email,
    password: hashedpassword,
  })

  const savedUser = await newuser.save();

  await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})




  if (!newuser) {
    return NextResponse.json(
      { message: "Error in creating user" },
      { status: 404 }
    );
  }


  return NextResponse.json(
    { message: "User is succesfully Created" },
    { status: 201 }
  );
}
