"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

function ForgotPass({}: Props) {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onResetLinkReq = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpass", user);
      toast.success("email for password reset sent successfully");
    } catch (error: any) {
      toast.error("invalid email");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="bg-gray-200">
      <Toaster position="top-right" />
      <div className="flex mx-auto min-h-screen max-w-screen-md items-center justify-center">
        <div className="flex flex-col items-center rounded-md w-2/3 m-auto justify-center shadow-md bg-white py-12">
          {loading && (
            <div className="text-3xl font-medium p-3 m-3">
              Loading...mail in progress
            </div>
          )}

          {!loading && (
            <>
              <div className="text-3xl font-medium p-3 m-3">
                Reset your password
              </div>

              <div className="text-xl text-center font-light p-2 w-3/4">
                Enter your email to recieve a reset link
              </div>
            </>
          )}

          <div className="flex flex-box items-center justify-center w-3/4 p-2 m-3">
            <div className="flex items-center justify-center ">
              <div className="flex-box">
                <div className="border border-gray-500 rounded-xl mb-4 ">
                  <input
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    type="email"
                    placeholder="Email"
                    className="focus:outline-blue-500 w-full p-2 text-2xl rounded-xl placeholder:font-light "
                  ></input>
                </div>

                <div className="flex items-center justify-center my-4">
                  <button
                    onClick={() => {
                      if (buttonDisabled == false) {
                        onResetLinkReq;
                      }
                    }}
                    className={`btn  w-full rounded-md text-xl text-white p-4 ${
                      buttonDisabled ? `bg-blue-300` : `bg-blue-600`
                    }`}
                  >
                    {buttonDisabled ? "Enter Email" : "send link"}
                  </button>
                </div>

                <div className="flex justify-center">
                  <p>Already have an account?</p>&nbsp;
                  <Link href={"/login"} className="text-blue-600 font-medium">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
