"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";

type props = {};

const SignupPage = (props: props) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("../api/users/signup", user);
      toast.success("signed up successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error("couldn't signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200">
      <Toaster position="top-right" />
      <div className="flex mx-auto min-h-screen max-w-screen-md items-center justify-center">
        <div className="flex flex-col items-center rounded-md w-2/3 m-auto justify-center shadow-md bg-white py-12">
          <div className="text-3xl font-medium p-3 m-3 text-center">
            {loading ? "Loading" : "Create your own account"}
          </div>

          <div className="text-xl text-center font-light p-2 w-3/4">
            Sign in to access your dashboard, settings and project
          </div>

          <div className="flex flex-box items-center justify-center w-3/4 p-2 m-3">
            <div className="flex items-center justify-center ">
              <div className="flex-box">
                <div className="border border-gray-500 rounded-xl mb-4 ">
                  <input
                    id="username"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    type="text"
                    placeholder="Username"
                    className="focus:outline-blue-500 w-full p-2 text-2xl rounded-xl placeholder:font-light "
                  ></input>
                </div>

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

                <div className="flex relative border border-gray-500 rounded-xl my-4">
                  <input
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    className=" w-full p-2 text-2xl rounded-xl focus:outline-blue-500  "
                    autoComplete="current-password"
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

                <div className="flex items-center justify-center my-4">
                  <button
                    onClick={() => {
                      if (buttonDisabled == false) {
                        onSignup;
                      }
                    }}
                    className={`btn  w-full rounded-md text-xl text-white p-4 ${
                      buttonDisabled ? `bg-blue-300` : `bg-blue-600`
                    }`}
                  >
                    {buttonDisabled ? "No signup" : "Signup"}
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
};

export default SignupPage;
