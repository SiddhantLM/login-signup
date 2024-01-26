"use client";
import React, { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
type Props = {};

const ProfilePage = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    const response = NextResponse.next();
    const email = response.cookies.get("email");
  }, []);
  const logout = async () => {
    try {
      const logout = await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("logged out successfully");
    } catch (error: any) {
      toast.error("error logging out");
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-box items-center justify-center gap-4">
      <Toaster position="top-right" />
      <div className="text-center font-bold text-4xl text-black ">
        <h1 className="my-4 p-4 bg-green-400 rounded-xl">
          You have successfully logged in! Congratulations
        </h1>
        <button
          onClick={logout}
          className="text-4xl p-3 bg-black text-white rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
