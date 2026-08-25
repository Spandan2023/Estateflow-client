import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  KeyRound,
  X,
} from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import PropertyVideoPopup from "../../components/common/PropertyVideoPopup";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import sukhneerLogo from "../../assets/logo/sukhneer-logo.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      const token = data?.token;
      const user = data?.user;

      if (!token || !user) {
        throw new Error("Invalid login response. Please try again.");
      }

      login(data);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#F9F8F6] lg:grid lg:grid-cols-5">

        {/* LEFT BRAND PANEL */}

        <section
          className="relative hidden overflow-hidden bg-[#1A1A1A] lg:col-span-2 lg:flex lg:flex-col lg:justify-between"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26, 26, 26, 0.78), rgba(26, 26, 26, 0.94)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* BRAND LOGO */}

          <div className="p-10 xl:p-14">
            <Link
              to="/"
              className="inline-flex items-center"
            >
              <img
                src={sukhneerLogo}
                alt="Sukhneer"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* CONTENT */}

          <div className="max-w-md p-10 pb-16 xl:p-14 xl:pb-20">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#C4943E]">
              Real Estate Operations
            </p>

            <h1 className="text-4xl font-semibold leading-tight text-[#F9F8F6] xl:text-5xl">
              Manage properties, people, and performance in one place.
            </h1>

            <p className="mt-6 text-base leading-7 text-[#E5D5BC]">
              A secure internal platform built for efficient real estate teams.
            </p>

          </div>
        </section>

        {/* LOGIN SECTION */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:col-span-3">

          <div className="w-full max-w-md">

            {/* MOBILE BRANDING */}

            <Link
              to="/"
              className="mb-12 inline-flex items-center lg:hidden"
            >
              <img
                src={sukhneerLogo}
                alt="Sukhneer"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* FORM CARD */}

            <div className="rounded-2xl border border-[#E5D5BC] bg-white p-7 shadow-sm sm:p-10">

              {/* HEADING */}

              <div className="mb-8">

                <p className="text-sm font-semibold text-[#C4943E]">
                  Welcome back
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                  Sign in to your account
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#6B6258]">
                  Enter your details to access the Sukhneer CRM.
                </p>

              </div>

              {/* ERROR */}

              {error && (
                <div
                  className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />

                {/* PASSWORD */}

                <div className="space-y-2">

                  <div className="flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-[#2C2416]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm font-semibold text-[#C4943E] transition hover:text-[#9C7029]"
                    >
                      Forgot Password?
                    </button>

                  </div>

                  <div className="relative">

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="w-full rounded-xl border border-[#D8CBB8] bg-[#FFFEFC] px-4 py-3 pr-12 text-[#1A1A1A] outline-none transition placeholder:text-[#9A9187] focus:border-[#C4943E] focus:ring-2 focus:ring-[#C4943E]/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8177] transition hover:text-[#1A1A1A]"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>

                  </div>

                </div>

                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

              </form>

              {/* SIGNUP LINK */}

              <p className="mt-7 text-center text-sm text-[#6B6258]">
                New employee?{" "}

                <Link
                  to="/signup"
                  className="font-semibold text-[#C4943E] transition hover:text-[#9C7029]"
                >
                  Create an account
                </Link>
              </p>

            </div>

            {/* FOOTER */}

            <p className="mt-6 text-center text-xs text-[#9A9187]">
              © {new Date().getFullYear()} Sukhneer CRM. Internal use only.
            </p>

          </div>
        </section>
      </main>

      {/* FORGOT PASSWORD MODAL */}

      {showForgotPassword && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-password-title"
        >

          <div className="relative w-full max-w-md rounded-2xl border border-[#E5D5BC] bg-[#F9F8F6] p-7 shadow-2xl sm:p-8">

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#6B6258] transition hover:bg-[#E5D5BC]/50 hover:text-[#1A1A1A]"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5D5BC] text-[#C4943E]">
              <KeyRound size={26} />
            </span>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#C4943E]">
              Password Reset
            </p>

            <h2
              id="forgot-password-title"
              className="mt-2 text-2xl font-semibold text-[#1A1A1A]"
            >
              Need help signing in?
            </h2>

            <p className="mt-4 leading-7 text-[#6B6258]">
              Password resets are currently managed by your administrator.
              Please contact your administrator to request access to your
              account.
            </p>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="mt-7 w-full rounded-xl bg-[#C4943E] px-5 py-3.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#B7832F]"
            >
              Got it
            </button>

          </div>
        </div>
      )}

      {/* MARKETING VIDEO POPUP */}

      <PropertyVideoPopup />
    </>
  );
}

export default Login;