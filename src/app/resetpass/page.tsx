"use client";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {};

const ResetPass = (props: Props) => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password]);

  const changePass = async () => {
    try {
      await axios.post("/api/users/resetpass", { password, token });
      setIsChanged(true);
      toast.success("password changed !!");
    } catch (error: any) {
      setError(true);
      toast.error("error changing the password ");
    }
  };
  return (
    <div className="bg-gray-200">
      <Toaster position="top-right" />
      {!isChanged && (
        <div className="flex mx-auto min-h-screen max-w-screen-md items-center justify-center">
          <div className="flex flex-col items-center rounded-md w-2/3 m-auto justify-center shadow-md bg-white py-12">
            <div className="text-3xl font-medium p-3 m-3">
              Reset your password
            </div>

            <div className="text-xl text-center font-light p-2 w-3/4">
              Enter your new password
            </div>

            <div className="flex items-center justify-center w-3/4 p-2 m-3">
              <div className="flex-col items-center justify-center ">
                <div className="flex relative border border-gray-500 rounded-xl my-4">
                  <input
                    name="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    className=" w-full p-2 text-2xl rounded-xl focus:outline-blue-500  "
                  />
                  <div className="absolute right-0 ">
                    <button onClick={() => setShow(!show)} className="p-4">
                      {show ? (
                        <FaEyeSlash className="text-slate-600" size={20} />
                      ) : (
                        <FaEye className="text-slate-600" size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (buttonDisabled == false) {
                      ResetPass;
                    }
                  }}
                  className={`btn  w-full rounded-md text-xl text-white p-4 ${
                    buttonDisabled ? `bg-blue-300` : `bg-blue-600`
                  }`}
                >
                  {buttonDisabled ? "invalid pass" : "Reset Password"}
                </button>

                <div className="flex justify-center">
                  <p>Don&apos;t have an account?</p>&nbsp;
                  <Link href={"/signup"} className="text-blue-600 font-medium">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isChanged && (
        <div className="flex mx-auto min-h-screen max-w-screen-md items-center justify-center">
          <div className="flex flex-col items-center rounded-md w-2/3 m-auto justify-center shadow-md bg-white py-12">
            <div className="text-3xl font-medium p-3 m-3 text-center">
              Your password has been changed
            </div>

            <div className="flex items-center justify-center w-3/4 p-2 ">
              <div className="flex flex-col items-center justify-center w-2/3">
                <Link
                  href={"/login"}
                  className="btn bg-blue-600 w-full rounded-md  text-xl text-white p-4 text-center"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPass;
