import { useState } from "react";
import InputField from "../components/inputField";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    let tempErrors = { email: "", password: "" };
    let hasError = false;

    if (!email.trim()) {
      tempErrors.email = "Email is required";
      hasError = true;
    }

    if (!password.trim()) {
      tempErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(tempErrors);

    if (hasError) return;

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.data.user.username);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-alt">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-2xl bg-background rounded-xl shadow-md border border-border overflow-hidden grid grid-cols-2"
      >
        {/* LEFT SIDE */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-primary">Welcome Back</h2>

          <div className="mb-4">
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 bg-primary text-background py-2 rounded-lg text-lg 
                       hover:bg-gradient-to-r hover:from-primary hover:to-secondary 
                       transition-all duration-200"
          >
            Sign In
          </button>

          <p className="text-sm text-secondary mt-4">
            Don’t have an account?
            <span
              className="ml-1 text-primary cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center items-center bg-primary text-white p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Hello Again 👋</h3>
            <p className="mt-2 text-sm text-background">
              Login to access your dashboard
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}