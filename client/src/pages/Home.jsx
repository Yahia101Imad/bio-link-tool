import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold">BioLink</h1>

        <div className="flex gap-3">
          <Link to="/login">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">

        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl">
          Share all your links in one place
        </h1>

        <p className="text-gray-500 mt-4 max-w-md">
          Create your personal bio link page and share it anywhere. Simple, fast, and clean.
        </p>

        <button
          onClick={handleGetStarted}
          className="mt-8 bg-black text-white px-8 py-3 rounded-xl text-lg hover:scale-105 transition"
        >
          Get Started
        </button>

      </section>

      {/* Features */}
      <section className="mt-32 px-6">

        <h2 className="text-2xl font-bold text-center">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">

          <div className="p-6 border rounded-xl text-center shadow-sm">
            <h3 className="font-semibold text-lg">Unlimited Links</h3>
            <p className="text-gray-500 mt-2">
              Add as many links as you want.
            </p>
          </div>

          <div className="p-6 border rounded-xl text-center shadow-sm">
            <h3 className="font-semibold text-lg">Clean Design</h3>
            <p className="text-gray-500 mt-2">
              Minimal and modern UI.
            </p>
          </div>

          <div className="p-6 border rounded-xl text-center shadow-sm">
            <h3 className="font-semibold text-lg">Easy Sharing</h3>
            <p className="text-gray-500 mt-2">
              Share your profile with one link.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="mt-32 text-center text-gray-400 pb-6">
        © {new Date().getFullYear()} BioLink. All rights reserved.
      </footer>

    </div>
  );
}