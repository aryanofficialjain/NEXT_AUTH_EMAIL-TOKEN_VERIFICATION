import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/UserModel";
import { dbConnect } from "@/app/db/dbConnect";
import { getDatafromjwt } from "@/app/helpers/getDatafromToken";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const userId = await getDatafromjwt(request);
    const user = await UserModel.findById(userId);
    console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", data: { user } });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}