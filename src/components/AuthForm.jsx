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
    <div>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isLogin ? "Login to Your Account" : "Create a New Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        )}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <button
              className="text-blue-500 hover:underline font-medium"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              className="text-blue-500 hover:underline font-medium"
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

