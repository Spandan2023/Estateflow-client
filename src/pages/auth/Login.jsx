import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      // loginUser already returns res.data from authService.js
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
    <main className="min-h-screen bg-[#F8FAFC] lg:grid lg:grid-cols-5">
      <section
        className="relative hidden overflow-hidden bg-[#0F172A] lg:col-span-2 lg:flex lg:flex-col lg:justify-between"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85')",
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
            Real Estate Operations
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-white xl:text-5xl">
            Manage properties, people, and performance in one place.
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-300">
            A secure internal platform built for efficient real estate teams.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:col-span-3">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-12 inline-flex items-center gap-2 text-lg font-semibold text-[#0F172A] lg:hidden"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10B981] text-white">
              <Building2 size={19} />
            </span>
            EstateFlow CRM
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-medium text-[#10B981]">Welcome back</p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
                Sign in to your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details to access EstateFlow CRM.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1E293B]">
                    Password
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setError(
                        "Please contact your administrator to reset your password."
                      )
                    }
                    className="text-sm font-medium text-[#10B981] transition hover:text-emerald-700"
                  >
                    Forgot Password?
                  </button>
                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              New employee?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#10B981] transition hover:text-emerald-700"
              >
                Create an account
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} EstateFlow CRM. Internal use only.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;