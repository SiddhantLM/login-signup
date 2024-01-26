"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("logged in successfully");
      router.push("/profile");
    } catch (error) {
      toast.error("invalid username or password ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200">
      <Toaster position="top-right" />
      <div className="flex mx-auto min-h-screen max-w-screen-md items-center justify-center">
        <div className="flex flex-col items-center rounded-md w-2/3 m-auto justify-center shadow-md bg-white py-12">
          <div className="text-3xl font-medium p-3 m-3">Welcome !!</div>

          <div className="text-xl text-center font-light p-2 w-3/4">
            Sign in to access your dashboard, settings and project
          </div>

          <div className="flex flex-box items-center justify-center w-3/4 p-2 m-3">
            <div className="flex items-center justify-center ">
              <div className="flex-box">
                <div className="border border-gray-500 rounded-xl mb-4 ">
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Email"
                    className="focus:outline-blue-500 w-full p-2 text-2xl rounded-xl placeholder:font-light "
                  ></input>
                </div>

                <div className="flex relative border border-gray-500 rounded-xl my-4">
                  <input
                    name="pass"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
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

                <div className="flex flex-row justify-center mt-5">
                  {/* <div className="flex items-center  gap-1 rounded-xl  font-medium ">
                    <input
                      type="checkbox"
                      className=" w-4 h-4 text-sm"
                    />{" "}
                    Keep me signed in
                  </div> */}
                  <div>
                    <Link
                      href={"/forgotpass"}
                      className="text-blue-500 font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-center my-4">
                  <button
                    onClick={() => {
                      if (buttonDisabled == false) {
                        onLogin;
                      }
                    }}
                    className={`btn  w-full rounded-md text-xl text-white p-4 ${
                      buttonDisabled ? `bg-blue-300` : `bg-blue-600`
                    }`}
                  >
                    {buttonDisabled ? "No Login" : "Login"}
                  </button>
                </div>

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
      </div>
    </div>
  );
};

export default LoginPage;
