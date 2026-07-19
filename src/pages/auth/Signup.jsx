import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, CheckCircle2, Clock3 } from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { signupUser } from "../../services/authService";

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
          "Unable to submit your registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] lg:grid lg:grid-cols-5">
      <section
        className="relative hidden overflow-hidden bg-[#0F172A] lg:col-span-2 lg:flex lg:flex-col lg:justify-between"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.92)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="p-10 xl:p-14">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#10B981]">
              <Building2 size={23} strokeWidth={2.3} />
            </span>
            EstateFlow CRM
          </Link>
        </div>

        <div className="max-w-md p-10 pb-16 xl:p-14 xl:pb-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#10B981]">
            Employee Registration
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-white xl:text-5xl">
            Join a professional real estate operations team.
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-300">
            Every employee registration is reviewed by an EstateFlow
            administrator before CRM access is granted.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:col-span-3">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-lg font-semibold text-[#0F172A] lg:hidden"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10B981] text-white">
              <Building2 size={19} />
            </span>
            EstateFlow CRM
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
            {success ? (
              <div className="py-4 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[#10B981]">
                  <CheckCircle2 size={34} />
                </span>

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-[#10B981]">
                  Registration Submitted
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">
                  Your request is under review.
                </h1>

                <p className="mt-4 leading-7 text-slate-500">
                  An administrator must approve your employee account before
                  you can access EstateFlow CRM.
                </p>

                <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
                  <div className="flex gap-3">
                    <Clock3
                      size={20}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />

                    <p className="text-sm leading-6 text-amber-800">
                      Please check back later and sign in only after your
                      application has been approved.
                    </p>
                  </div>
                </div>

                <Link
                  to="/login"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-[#10B981] py-3.5 font-semibold text-[#10B981] transition hover:bg-emerald-50"
                >
                  Go to Sign In
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-sm font-medium text-[#10B981]">
                    Create your account
                  </p>

                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
                    Employee Registration
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Your registration must be approved by an administrator
                    before you can sign in.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

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
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />

                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    minLength="6"
                    required
                  />

                  <Button type="submit" disabled={loading}>
                    {loading ? "Submitting Request..." : "Submit Registration"}
                  </Button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-500">
                  Already approved?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-[#10B981] transition hover:text-emerald-700"
                  >
                    Sign In
                  </Link>
                </p>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} EstateFlow CRM. Internal use only.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Signup;