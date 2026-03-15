import { useState } from "react";
import InputField from "../components/inputField";
import { registerUser } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({
        username: name,
        email,
        password,
      });

      console.log(res.data);
      // HERE SENDING USER TO NEXT PAGE "DASHBOARD" AND SHOWING REGISTRATION DONE
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-2"
      >
        {/* LEFT SIDE - Form */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-primaryDark">
            Register
          </h2>

          <InputField
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Register
          </button>
        </div>

        {/* RIGHT SIDE - Panel */}
        <div className="flex justify-center items-center text-white text-center bg-gradient-to-tr from-primary to-primaryDark p-6">
          <div>
            <h3 className="text-xl font-semibold">Join Us Today!</h3>
            <p className="mt-2 text-sm">
              Register to get started with us
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}