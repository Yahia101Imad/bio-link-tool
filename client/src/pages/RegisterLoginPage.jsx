import { useState } from "react";

export default function LoginRegister() {
  const [signIn, toggle] = useState(true);

  return (
    <div className="w-full max-w-2xl h-[400px] bg-white rounded-xl shadow-lg mx-auto grid grid-cols-2 overflow-hidden">
      {/* LEFT SIDE */}
      <div className="relative">
        {/* Register Form */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center p-6 bg-amber-50 z-50 transition-transform duration-1000 transition-opacity duration-1000 ease-in-out ${
            signIn ? "opacity-0" : "opacity-100"
          }`}
          style={{ transform: signIn ? "translateX(0%)" : "translateX(100%)" }}
        >
          <h2 className="font-bold mb-4">Register</h2>

          <input
            placeholder="Name"
            className="w-full p-2 mb-2 bg-gray-200 rounded"
          />
          <input
            placeholder="Email"
            className="w-full p-2 mb-2 bg-gray-200 rounded"
          />
          <input
            placeholder="Password"
            className="w-full p-2 mb-3 bg-gray-200 rounded"
          />

          <button className="bg-red-500 text-white px-5 py-2 rounded">
            Register
          </button>
        </div>

        {/* SignIn Form */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center p-6 bg-amber-100 z-50 transition-transform duration-1000 transition-opacity duration-1000 ease-in-out ${
    signIn ? "opacity-100" : "opacity-0"
  }`}
          style={{ transform: signIn ? "translateX(0%)" : "translateX(100%)" }}
        >
          <h2 className="font-bold mb-4">Sign In</h2>

          <input
            placeholder="Email"
            className="w-full p-2 mb-2 bg-gray-200 rounded"
          />
          <input
            placeholder="Password"
            className="w-full p-2 mb-3 bg-gray-200 rounded"
          />

          <button className="bg-red-500 text-white px-5 py-2 rounded">
            Sign In
          </button>
        </div>

        {/* Card with SignIn button */}
        <div className="absolute inset-0 flex justify-center items-center  text-white bg-sky-500/10 border z-99 border">
          <button
            onClick={() => toggle(true)}
            className="border px-6 py-2 rounded"
          >
            Go To Sign In
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative">
        {/* Card with Register button */}
        <div className="absolute inset-0 flex justify-center items-center text-white bg-sky-500/10 border z-99">
          <button
            onClick={() => toggle(false)}
            className="border px-6 py-2 rounded"
          >
            Go To Register
          </button>
        </div>

        {/* Colored Panel */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 flex justify-center items-center text-white transition-transform duration-1000 z-60"
          style={{ transform: signIn ? "translateX(0%)" : "translateX(-100%)" }}
        >
          {/* <h2 className="text-xl font-bold">
            Panel
          </h2> */}
        </div>
      </div>
    </div>
  );
}
