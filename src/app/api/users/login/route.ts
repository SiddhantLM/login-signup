import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "user doesnt exist" }, { status: 102 });
    }

    //validate password with bcryptjs
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "password incorrect" },
        { status: 102 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token with jwt

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.log({ error: error.message }, { status: 401 });
  }
}
