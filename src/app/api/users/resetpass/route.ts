import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Attempt to connect to the database
    await connect();
    console.log("Connected to the database");
  } catch (error) {
    // Log any error that occurs during the database connection
    console.error("Error connecting to the database:", error);
    return NextResponse.json(
      { error: "Database connection error" },
      { status: 501 }
    );
  }

  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;

    const user = await User.findOne({
      forgotPassToken: token,
      forgotPassTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("user not found or reset link expired");
      return NextResponse.json(
        { message: "user not found or verify link expired" },
        { status: 400 }
      );
    }

    console.log(user);

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    user.password = hashedPass;
    user.forgotPassToken = undefined;
    user.forgotPassTokenExpiry = undefined;

    await user.save();
    const res = NextResponse.json({
      message: "password reset",
      success: true,
    });

    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({
      error: "password change error",
      status: 500,
    });
  }
}
