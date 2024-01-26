import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login-Signup",
  description:
    "this app is created for user authentication. it has reste passowrd functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
