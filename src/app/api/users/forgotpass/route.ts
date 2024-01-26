import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

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

    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "user doesnt exist" }, { status: 102 });
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json(
      {
        message: "reset email sent successfully",
        success: true,
        // data : newUser
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "email couldnt be sent using nodemailer" },
      { status: 500 }
    );
  }
}
