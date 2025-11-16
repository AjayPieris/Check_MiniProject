import React, { useState } from "react";
import FloatingInput from "../components/FloatingInput";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  function validate() {
    const next = {};
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      next.email = "Valid email required";
    if (form.password.length < 6) next.password = "Min 6 characters";
    return next;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setLoading(true);
    // Fake async
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    alert("Signed in!");
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-10 sm:py-16 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#fff7ec,transparent_60%)] dark:bg-white">

      <div
        className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-2 select-none 
bg-gradient-to-r from-orange-600 via-yellow-500 to-teal-600 
bg-clip-text text-transparent"
      >
        CeyloneConnect
      </div>

      <div
        className="mx-auto mt-10 w-full max-w-md rounded-3xl bg-white/90 dark:bg-neutral-900 backdrop-blur-md
          p-8 sm:p-10 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] ring-1 ring-neutral-200/70 dark:ring-neutral-800
          animate-scale-in"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-800 dark:text-neutral-100">
            Welcome Back
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <FloatingInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div className="relative">
            <FloatingInput
              label="Password"
              name="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-[2px] text-xs font-medium text-orange-600 hover:text-orange-500 active:scale-95 transition"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-end -mt-3">
            <a
              href="#"
              className="text-sm font-medium bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400
                font-semibold text-white shadow-md shadow-orange-300/40
                transition-all duration-500 hover:shadow-xl hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-orange-200
                active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 animate-gradient-x"
          >
            <span
              className={`flex items-center justify-center gap-2 py-3 text-sm tracking-wide ${
                loading ? "opacity-0" : "opacity-100"
              }`}
            >
              Sign In
            </span>

            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-5 w-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                <div className="mt-3 h-1 w-4/5 overflow-hidden rounded-full bg-white/30">
                  <div className="h-full w-1/3 animate-loading-bar rounded-full bg-white"></div>
                </div>
              </div>
            )}

            {/* Button animated shine */}
            <div className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:-translate-x-full before:animate-shine before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent"></div>
          </button>
        </form>

        <p className="mt-8 text-center text-neutral-600 dark:text-neutral-400 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold bg-gradient-to-r from-orange-600 via-yellow-500 to-teal-600 bg-clip-text text-transparent hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
