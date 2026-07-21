import { Link } from "react-router-dom";
import {
  Building2,
  Home,
  Phone,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative h-[560px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/70"></div>

      {/* ================= Navbar ================= */}

      <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/15">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-semibold text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
              <Building2 size={21} />
            </span>

            EstateFlow
          </Link>

          {/* Navigation */}

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link
              to="/"
              className="text-slate-200 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/properties"
              className="relative font-semibold text-white"
            >
              Properties

              <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded bg-emerald-500"></span>
            </Link>

            <Link
              to="/#about"
              className="text-slate-200 transition hover:text-white"
            >
              About Us
            </Link>

            <Link
              to="/#contact"
              className="text-slate-200 transition hover:text-white"
            >
              Contact
            </Link>
          </nav>

          {/* Login */}

          <Link
            to="/login"
            className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-slate-900"
          >
            Login
          </Link>
        </div>
      </header>

      {/* ================= Hero Content ================= */}

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">

        <div className="max-w-4xl">

          <span className="inline-block rounded-full border border-emerald-400 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300">
            EstateFlow Premium Listings
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-6xl">
            Find Your
            <span className="text-emerald-400"> Dream Property</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
            Browse premium apartments, villas, plots and commercial
            properties across multiple cities. Discover your perfect
            investment with EstateFlow.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold shadow-lg transition hover:bg-emerald-600"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <Link
              to="/#contact"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 font-semibold transition hover:bg-white/10"
            >
              <Phone size={19} />
              Contact Us
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;