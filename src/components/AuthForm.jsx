import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between Login and Sign Up
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "", // only used in Sign Up
  });

  const navigate = useNavigate();

    // 🔐 Redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/body"); // ✅ Redirect logged-in users
      }
    };
    checkSession();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (isLogin) {
    // LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("Logged in successfully!");
      // Redirect or update UI
      navigate("/body")
    }

  } else {
    // SIGNUP
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { username: formData.username }, // storing username as metadata
      }
    });

    if (error) {
      alert("Sign up failed: " + error.message);
    } else {
      alert("Sign up successful! Please check your email to confirm.");
      setIsLogin(true); // switch to login form
      navigate("/body");
    }
  }
};

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4 py-2">
    <div className="w-full max-w-md bg-[#1e293b] shadow-2xl rounded-2xl p-8 border border-slate-700 transition-transform duration-300 hover:scale-[1.01]">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-300">
        {isLogin ? "Login to Your Account" : "Create a New Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div>
            <label className="block mb-1 text-slate-300 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
              placeholder="Enter your username"
              required
            />
          </div>
        )}
        <div>
          <label className="block mb-1 text-slate-300 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-300 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-slate-800 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-indigo-400/50"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-center text-slate-400 text-sm">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <button
              className="text-sky-400 hover:underline font-medium"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              className="text-sky-400 hover:underline font-medium"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </>
        )}
      </p>
    </div>
  </div>
);




  
};

export default AuthForm;

