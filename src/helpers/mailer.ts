import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      const user = await User.findByIdAndUpdate(userId, {
        forgotPassToken: hashedToken,
        forgotPassTokenExpiry: Date.now() + 3600000,
      });
    }

    // var transport = nodemailer.createTransport({
    //   host: "live.smtp.mailtrap.io",
    //   port: 587,
    //   auth: {
    //     user: process.env.MAIL_USER_ID!,
    //     pass: process.env.MAIL_PASS!,
    //   },
    // });

    const transport = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER_ID!,
        pass: process.env.MAIL_PASS!,
      },
    });

    const mailOptions = {
      from: "login-signup-next.vercel.app",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href='${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}'>Here </a> to ${
              emailType === "VERIFY"
                ? "verify your email"
                : "reset your password"
            }. or copy paste this link in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}</p>`
          : `<p>Click <a href='${
              process.env.DOMAIN
            }/resetpass?token=${hashedToken}'>Here </a> to ${
              emailType === "VERIFY"
                ? "verify your email"
                : "reset your password"
            }. or copy paste this link in your browser. <br> ${
              process.env.DOMAIN
            }/resetpass?token=${hashedToken}</p>`,
    };

    const res = await transport.sendMail(mailOptions);

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
