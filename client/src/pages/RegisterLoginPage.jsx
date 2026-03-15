import { useState } from "react";
import InputField from "../components/inputField";

export default function LoginRegister() {
  const [signIn, setSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-2">
        
        {/* LEFT SIDE - Form */}
        <div className="p-8 flex flex-col justify-center transition-all duration-500">
          <h2 className="text-2xl font-bold mb-6 text-primaryDark">
            {signIn ? "Sign In" : "Register"}
          </h2>

          {!signIn && (
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="mt-6 bg-primary hover:bg-primaryDark text-white py-2 rounded transition-colors">
            {signIn ? "Sign In" : "Register"}
          </button>

          <p className="mt-4 text-sm text-textMuted">
            {signIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setSignIn(!signIn)}
              className="text-primary hover:underline"
            >
              {signIn ? "Register" : "Sign In"}
            </button>
          </p>
        </div>

        {/* RIGHT SIDE - Panel */}
        <div
          className="flex justify-center items-center text-white text-center transition-colors duration-500 bg-gradient-to-tr from-primary to-primaryDark"
        >
          <div>
            <h3 className="text-xl font-semibold">
              {signIn ? "Welcome Back!" : "Join Us Today!"}
            </h3>
            <p className="mt-2 text-sm">
              {signIn
                ? "Sign in to access your dashboard"
                : "Register to get started with us"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}