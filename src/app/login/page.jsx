"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ email: "", password: "" });

  // VALIDATION
  const validate = ({ email, password }) => {
    const errs = {};

    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    try {
      setLoading(true);
      console.log(values);

      toast.success("Login successful");
      console.log({ data, error });
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
      redirect("/rooms");
    }
  };

  const fieldBox = (hasError) =>
    `flex items-center gap-3 border rounded-2xl bg-white/5 px-4 h-14 transition-colors ${
      hasError
        ? "border-red-500/70"
        : "border-white/10 focus-within:border-violet-500/60"
    }`;

  return (
    <div className="min-h-screen bg-[#0B1120]  flex  justify-center px-4 py-20 ">
      <div className="w-full max-w-md">
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl">
          <div className="p-8 md:p-10">
            {/* HEADING */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold font-(family-name:--font-space-grotesk) text-white">
                Welcome Back
              </h1>
              <p className="text-slate-400 mt-3">
                Login to continue booking premium study rooms.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              {/* EMAIL */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Email Address
                </label>
                <div className={fieldBox(errors.email)}>
                  <FaEnvelope className="text-cyan-400 text-lg shrink-0" />
                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="flex-1 min-w-0 bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-slate-300">Password</label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className={fieldBox(errors.password)}>
                  <FaLock className="text-cyan-400 text-lg shrink-0" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="flex-1 min-w-0 bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="shrink-0 text-slate-400 hover:text-cyan-400 transition"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <span>⚠</span> {errors.password}
                  </p>
                )}
              </div>

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                isLoading={loading}
                radius="full"
                className="w-full h-12 bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition mt-2"
              >
                Login
              </Button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* GOOGLE BUTTON */}
            <Button
              radius="full"
              variant="bordered"
              className="w-full h-14 border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>

            {/* REGISTER */}
            <p className="text-center text-slate-400 mt-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition"
              >
                Register
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
