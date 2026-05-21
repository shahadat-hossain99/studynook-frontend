"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaImage,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// PASSWORD RULES

const passwordRules = [
  { id: "length", label: "At least 6 characters", test: (p) => p.length >= 6 },
  {
    id: "uppercase",
    label: "One uppercase letter (A–Z)",
    test: (p) => /[A-Z]/.test(p),
  },

  { id: "number", label: "One number (0–9)", test: (p) => /[0-9]/.test(p) },
];

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const ruleResults = passwordRules.map((rule) => ({
    ...rule,
    passed: password.length > 0 && rule.test(password),
    failed: password.length > 0 && !rule.test(password),
  }));

  const allRulesPassed = passwordRules.every((rule) => rule.test(password));

  // VALIDATION
  const validate = (name, email, photoURL) => {
    const errs = {};

    if (!name.trim()) errs.name = "Full name is required.";

    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email address.";

    if (!photoURL.trim()) errs.photoURL = "Photo URL is required.";
    else if (!/^https?:\/\/.+/.test(photoURL))
      errs.photoURL = "Please enter a valid URL.";

    if (!password) errs.password = "Password is required.";
    else if (!allRulesPassed)
      errs.password = "Please fix the password requirements below.";

    return errs;
  };

  //SUBMIT
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;

    const errs = validate(name, email, photoURL);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      name: user.name,
      password: user.password,
      image: user.photoURL,
    });

    try {
      setLoading(true);
      // console.log(user, error);

      toast.success("Registration successful! Please login.");
      // console.log(data);
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
      redirect("/login");
    }
  };

  const fieldBox = (hasError) =>
    `flex items-center gap-3 border rounded-2xl bg-white/5 px-4 h-14 transition-colors ${
      hasError
        ? "border-red-500/70"
        : "border-white/10 focus-within:border-violet-500/60"
    }`;

  const inputClass =
    "flex-1 min-w-0 bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none";

  return (
    <div className="min-h-screen bg-[#0B1120] py-14  px-4 flex  justify-center">
      <div className="w-full max-w-xl ">
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl ">
          <div className="p-8 md:p-10">
            {/* HEADING */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black font-(family-name:--font-space-grotesk) text-white">
                Create Account
              </h1>
              <p className="text-slate-400 mt-3">
                Join StudyNook and start booking premium study rooms.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleRegister} className="space-y-5" noValidate>
              {/* NAME */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Full Name
                </label>
                <div className={fieldBox(errors.name)}>
                  <FaUser className="text-cyan-400 text-lg shrink-0" />
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    ⚠ {errors.name}
                  </p>
                )}
              </div>

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
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    ⚠ {errors.email}
                  </p>
                )}
              </div>

              {/* PHOTO URL */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Photo URL
                </label>
                <div className={fieldBox(errors.photoURL)}>
                  <FaImage className="text-cyan-400 text-lg shrink-0" />
                  <input
                    name="photoURL"
                    type="text"
                    placeholder="Paste your photo URL"
                    className={inputClass}
                  />
                </div>
                {errors.photoURL && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    ⚠ {errors.photoURL}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Password
                </label>
                <div className={fieldBox(errors.password)}>
                  <FaLock className="text-cyan-400 text-lg shrink-0" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    className={inputClass}
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
                    ⚠ {errors.password}
                  </p>
                )}

                {/* LIVE PASSWORD RULES */}
                <div className="mt-3 space-y-2">
                  {ruleResults.map((rule) => (
                    <div
                      key={rule.id}
                      className={`flex items-center gap-2 text-xs transition-colors ${
                        rule.passed
                          ? "text-emerald-400"
                          : rule.failed
                            ? "text-red-400"
                            : "text-slate-500"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-4 h-4 rounded-full border text-[10px] transition-all ${
                          rule.passed
                            ? "border-emerald-400 bg-emerald-400/10"
                            : rule.failed
                              ? "border-red-400 bg-red-400/10"
                              : "border-slate-600"
                        }`}
                      >
                        {rule.passed ? (
                          <FaCheck />
                        ) : rule.failed ? (
                          <FaTimes />
                        ) : null}
                      </span>
                      {rule.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* REGISTER BUTTON */}
              <Button
                type="submit"
                isLoading={loading}
                radius="full"
                className="w-full h-12 bg-linear-to-r from-violet-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition mt-2"
              >
                Register
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

            {/* LOGIN */}
            <p className="text-center text-slate-400 mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition"
              >
                Login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
