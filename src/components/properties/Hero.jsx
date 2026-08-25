import { Link } from "react-router-dom";
import {
  Phone,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import sukhneerLogo from "../../assets/logo/Sukhneer-logo.png";

const Hero = () => {
  return (
    <section
      className="relative h-[560px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark luxury overlay */}
      <div className="absolute inset-0 bg-[#1A1A1A]/80" />

      {/* ================= NAVBAR ================= */}

      <header className="absolute left-0 right-0 top-0 z-20 border-b border-[#E5D5BC]/30">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src={sukhneerLogo}
              alt="Sukhneer"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className="text-[#E5D5BC] transition hover:text-[#C4943E]"
            >
              Home
            </Link>

            <Link
              to="/properties"
              className="relative font-semibold text-white"
            >
              Properties

              <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded bg-[#C4943E]" />
            </Link>

            <a
              href="/#contact"
              className="text-[#E5D5BC] transition hover:text-[#C4943E]"
            >
              Contact
            </a>
          </nav>

        </div>
      </header>

      {/* ================= HERO CONTENT ================= */}

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
        <div className="max-w-4xl">

          <span className="inline-block rounded-full border border-[#C4943E]/70 bg-[#C4943E]/15 px-4 py-2 text-sm font-medium text-[#E5D5BC]">
            Sukhneer Property Listings
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-6xl">
            Find a Property
            <span className="text-[#C4943E]">
              {" "}That Feels Like Home
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#E5D5BC] md:text-xl">
            Explore residential and commercial properties with Sukhneer.
            Find the right space for your home, investment, or future.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl bg-[#C4943E] px-8 py-4 font-semibold text-[#1A1A1A] shadow-lg transition hover:bg-[#E5D5BC]"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <a
              href="/#contact"
              className="flex items-center gap-2 rounded-xl border border-[#E5D5BC]/50 px-8 py-4 font-semibold text-white transition hover:border-[#C4943E] hover:bg-[#C4943E]/10"
            >
              <Phone size={19} />
              Contact Us
              <ArrowRight size={18} />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;