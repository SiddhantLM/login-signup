import connect from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connect();
    console.log("database connected");
  } catch (error: any) {
    console.log("database couldn't be connected");
    return NextResponse.json(
      { message: "db couldn't be connected" },
      { status: 400 }
    );
  }

  try {
    const reqBody = await request.json();

    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("user not found or verify link expired");
      return NextResponse.json(
        { message: "user not found or verify link expired" },
        { status: 400 }
      );
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
    return NextResponse.json({
      message: "emailverified",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
