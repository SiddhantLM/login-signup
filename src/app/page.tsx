import Link from "next/link";

export default function Home() {
  return (
    <div className="flex mx-auto min-h-screen max-w-screen-md items-center justify-center">
      <div className="flex flex-col items-center rounded-md w-full m-auto justify-center shadow-md bg-white py-12">
        <div className="text-5xl text-center font-bold p-3 m-3">
          {/* {loading ? "Loading" : "Welcome Back"}
           */}
          Welcome to my NEXT JS user authentication project
        </div>

        <div className="flex-col flex items-center text-xl text-center font-medium p-2 w-3/4">
          <p className="">Sign up for a new account</p>
          <Link
            href={"/signup"}
            className="btn bg-blue-500 text-2xl text-white rounded p-3 w-2/3 my-4"
          >
            <p>SIGN UP</p>
          </Link>
        </div>
        <div className="flex-col flex items-center text-xl text-center font-medium p-2 w-3/4">
          <p className="">Login to existing account</p>

          <Link
            href={"/login"}
            className="btn bg-gray-600 text-2xl text-white  w-2/3 rounded p-3 my-4"
          >
            <p>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
