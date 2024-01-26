import Link from "next/link";
import React from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

type Props = {
  buttonDisabled: Boolean;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignupForm = ({ buttonDisabled, setButtonDisabled }: Props) => {
  return (
    <div className="flex items-center justify-center ">
      <form className="flex-box">
        <div className="border border-gray-500 rounded-xl mb-4 ">
          <input
            type="text"
            placeholder="Username"
            className="focus:outline-blue-500 w-full p-2 text-2xl rounded-xl placeholder:font-light "
          ></input>
        </div>

        <div className="border border-gray-500 rounded-xl mb-4 ">
          <input
            type="email"
            placeholder="Email"
            className="focus:outline-blue-500 w-full p-2 text-2xl rounded-xl placeholder:font-light "
          ></input>
        </div>

        <div className="flex relative border border-gray-500 rounded-xl my-4">
          <input
            name="pass"
            type="password"
            placeholder="Password"
            className=" w-full p-2 text-2xl rounded-xl focus:outline-blue-500  "
          />
          <div className="absolute right-0 ">
            <button className="p-4">
              <FaEye className="text-slate-600" size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center my-4">
          <button className="btn bg-blue-600 w-full rounded-md text-xl text-white p-4">
            {buttonDisabled ? "No signup" : "Signup"}
          </button>
        </div>

        <div className="flex justify-center">
          <p>Already have an account?</p>&nbsp;
          <Link href={"/login"} className="text-blue-600 font-medium">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
