"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth"; // استيراد hook
import { useRouter } from "next/navigation"; // التوجيه بعد تسجيل الدخول

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, error, loading } = useAuth(); // استدعاء hook
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // التحقق من حالة المستخدم عند تحميل الصفحة
  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // تحويل المستخدم إذا كان مسجلًا
    }
  }, [user, router]);

  // التعامل مع تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser) {
        router.push("/dashboard");
      }
    } catch (err) {
      setErrorMessage(error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500">Please login to your account</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
