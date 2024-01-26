"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

const VerifyPage = (props: Props) => {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setIsVerified(true);
      toast.success("email has been verified");
    } catch (error: any) {
      setError(true);
      toast.error(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="bg-gray-200 h-screen flex  items-center justify-center">
      <Toaster position="top-right" />
      <div className="flex-box">
        <div className="flex flex-col items-center justify-center max-h-screen p-2">
          <h1 className="text-5xl text-black font-medium my-10">
            Email Verification
          </h1>
          <div className="text-3xl text-center ">your token </div>
          <h2 className="p-2  text-black">
            ${token ? `${token}` : "No token"}
          </h2>

          {isVerified && (
            <>
              <h2 className="text-2xl p-3 bg-green-500 my-4 rounded-xl">
                Your Email has been Verified
              </h2>
              <Link
                href={"/login"}
                className="  p-4 text-2xl text-white bg-blue-500 my-2 w-fit rounded-xl "
              >
                {" "}
                Login
              </Link>
            </>
          )}

          {error && (
            <div>
              <h2 className="text-2xl bg-red-500 text-black p-3 rounded-xl">
                Error
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
