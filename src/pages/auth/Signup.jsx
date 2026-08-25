import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
} from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import PropertyVideoPopup from "../../components/common/PropertyVideoPopup";

import { signupUser } from "../../services/authService";
import SukhneerLogo from "../../assets/logo/Sukhneer-logo.png";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);

      await signupUser(formData);

      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to submit your registration. Please try again.",
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
            <Link to="/" className="inline-block">
              <img
                src={SukhneerLogo}
                alt="Sukhneer"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* CONTENT */}
          <div className="max-w-md p-10 pb-16 xl:p-14 xl:pb-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#C4943E]">
              Employee Registration
            </p>

            <h1 className="text-4xl font-semibold leading-tight text-[#F9F8F6] xl:text-5xl">
              Join a professional real estate operations team.
            </h1>

            <p className="mt-6 text-base leading-7 text-[#E5D5BC]">
              Every employee registration is reviewed before access to the
              Sukhneer platform is granted.
            </p>
          </div>
        </section>

        {/* SIGNUP SECTION */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:col-span-3">
          <div className="w-full max-w-md">
            {/* MOBILE BRAND */}
            <Link
              to="/"
              className="mb-10 inline-block lg:hidden"
            >
              <img
                src={SukhneerLogo}
                alt="Sukhneer"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* FORM CARD */}
            <div className="rounded-2xl border border-[#E5D5BC] bg-white p-7 shadow-sm sm:p-10">
              {success ? (
                <div className="py-4 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3E7D2] text-[#C4943E]">
                    <CheckCircle2 size={34} />
                  </span>

                  <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-[#C4943E]">
                    Registration Submitted
                  </p>

                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                    Your request is under review.
                  </h1>

                  <p className="mt-4 leading-7 text-[#6B6258]">
                    An administrator must approve your employee account before
                    you can access the Sukhneer platform.
                  </p>

                  <div className="mt-7 rounded-xl border border-[#E5D5BC] bg-[#F9F8F6] p-4 text-left">
                    <div className="flex gap-3">
                      <Clock3
                        size={20}
                        className="mt-0.5 shrink-0 text-[#C4943E]"
                      />

                      <p className="text-sm leading-6 text-[#6B6258]">
                        Please check back later and sign in after your
                        application has been approved.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-[#1A1A1A] py-3.5 font-semibold text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white"
                  >
                    Go to Sign In
                  </Link>
                </div>
              ) : (
                <>
                  {/* HEADING */}
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-[#C4943E]">
                      Create your account
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                      Employee Registration
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#6B6258]">
                      Your registration must be approved by an administrator
                      before you can sign in.
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
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                      label="Full Name"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />

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

                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      required
                    />

                    {/* PASSWORD */}
                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-[#2C2416]"
                      >
                        Password
                      </label>

                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a secure password"
                          autoComplete="new-password"
                          minLength="6"
                          required
                          className="w-full rounded-xl border border-[#D8CBB8] bg-[#FFFEFC] px-4 py-3 pr-12 text-[#1A1A1A] outline-none transition placeholder:text-[#9A9187] focus:border-[#C4943E] focus:ring-2 focus:ring-[#C4943E]/20"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8177] transition hover:text-[#C4943E]"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-[#9A9187]">
                        Password must contain at least 6 characters.
                      </p>
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading
                        ? "Submitting Request..."
                        : "Submit Registration"}
                    </Button>
                  </form>

                  {/* LOGIN LINK */}
                  <p className="mt-7 text-center text-sm text-[#6B6258]">
                    Already approved?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-[#C4943E] transition hover:text-[#9B702A]"
                    >
                      Sign In
                    </Link>
                  </p>
                </>
              )}
            </div>

            <p className="mt-6 text-center text-xs text-[#9A9187]">
              © {new Date().getFullYear()} Sukhneer. Internal use only.
            </p>
          </div>
        </section>
      </main>

      {/* FLOATING PROPERTY VIDEO */}
      <PropertyVideoPopup />
    </>
  );
}

export default Signup;