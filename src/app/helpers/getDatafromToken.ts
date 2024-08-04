import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"

export async function getDatafromjwt(request: NextRequest){
    const token = request.cookies.get("token")?.value || "";
    const decodedtoken: any = jwt.verify(token, process.env.JWT_SECRET!);

    return decodedtoken.id;
}