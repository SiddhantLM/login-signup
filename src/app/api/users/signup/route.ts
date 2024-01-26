import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
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
    // Parse the JSON request body
    const reqBody = await request.json();
    console.log("Request Body:", reqBody);

    // Extract user information from the request body
    const { username, email, password } = reqBody;

    // Check if the user already exists
    // const user = await User.findOne({email});

    // If user already exists, return an error response
    // if (user) {
    //     return NextResponse.json({ error: "User already exists" }, { status: 400 });
    // }

    // Generate a salt and hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    // console.log("Hashed Password:", hashedPass);

    // Create a new User instance with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log("Saved User:", savedUser);

    //Send verification mail
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // Return a success response
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
        // data : newUser
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Log any errors that occur during the request processing
    console.error("Error occurred while processing the request:", error);
    return NextResponse.json(
      { error: "error happened inside" },
      { status: 500 }
    );
  }
}
