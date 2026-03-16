import { useState } from "react";
import InputField from "../components/inputField";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      // console.log(res.data);
      
      // SAVE TOKEN IN LOCALSTORAGE
      localStorage.setItem("token", res.data.token);
      
      // HERE SENDING USER TO NEXT PAGE "DASHBOARD"
      navigate('/dashboard')
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-2"
      >
        {/* LEFT SIDE - Form */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-primaryDark">
            Sign In
          </h2>

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

          <button
            type="submit"
            className="mt-6 bg-primary hover:bg-primaryDark text-white py-2 rounded transition-colors"
          >
            Sign In
          </button>
        </div>

        {/* RIGHT SIDE - Panel */}
        <div className="flex justify-center items-center text-white text-center bg-gradient-to-tr from-primary to-primaryDark p-6">
          <div>
            <h3 className="text-xl font-semibold">Welcome Back!</h3>
            <p className="mt-2 text-sm">
              Sign in to access your dashboard
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}