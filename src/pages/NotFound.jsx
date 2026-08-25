import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Search,
} from "lucide-react";

import sukhneerLogo from "../assets/logo/Sukhneer-logo.png";

const NotFound = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F9F8F6] text-[#1A1A1A]">

      {/* ================= BACKGROUND DECOR ================= */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#C4943E]/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#2C2416]/5 blur-3xl" />

      </div>


      {/* ================= NAVBAR ================= */}

      <header className="relative z-20 border-b border-[#E5D5BC] bg-[#F9F8F6]/90 backdrop-blur">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

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

          <Link
            to="/properties"
            className="hidden items-center gap-2 text-sm font-semibold text-[#2C2416] transition hover:text-[#C4943E] sm:flex"
          >
            Browse Properties
            <ChevronRight size={17} />
          </Link>

        </div>

      </header>


      {/* ================= CONTENT ================= */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-16 sm:px-8">

        <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-20">


          {/* ================= LEFT ================= */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C4943E]">
              Error 404
            </p>

            <h1 className="mt-4 text-[7rem] font-semibold leading-none tracking-tight text-[#2C2416] sm:text-[10rem]">
              404
            </h1>

            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-[#1A1A1A] sm:text-5xl">
              This property seems to be{" "}
              <span className="text-[#C4943E]">
                off the market.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#5C554B] sm:text-lg">
              The page you're looking for may have been moved, removed,
              or never existed in the first place. Even the best property
              search needs the right address.
            </p>


            {/* ================= ACTIONS ================= */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg bg-[#C4943E] px-6 py-3.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#E5D5BC]"
              >
                <Home size={18} />
                Back Home
              </Link>

              <Link
                to="/properties"
                className="inline-flex items-center gap-2 rounded-lg border border-[#E5D5BC] bg-white px-6 py-3.5 text-sm font-semibold text-[#2C2416] transition hover:border-[#C4943E] hover:text-[#C4943E]"
              >
                <Search size={18} />
                Browse Properties
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-lg border border-[#E5D5BC] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#5C554B] transition hover:bg-white hover:text-[#2C2416]"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>

            </div>

          </div>


          {/* ================= RIGHT VISUAL ================= */}

          <div className="relative">

            <div className="relative overflow-hidden rounded-2xl border border-[#E5D5BC] bg-white p-3 shadow-xl">

              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                alt="Sukhneer property"
                className="h-[400px] w-full rounded-xl object-cover sm:h-[500px]"
              />

              {/* Dark Overlay */}

              <div className="absolute inset-3 rounded-xl bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />


              {/* 404 Badge */}

              <div className="absolute bottom-8 left-8">

                <div className="inline-flex items-center rounded-lg border border-[#E5D5BC]/30 bg-[#2C2416]/85 px-5 py-3 text-white backdrop-blur">

                  <span className="text-sm font-semibold tracking-[0.18em] text-[#C4943E]">
                    SUKHNEER
                  </span>

                  <span className="mx-3 h-5 w-px bg-[#E5D5BC]/30" />

                  <span className="text-sm text-[#E5D5BC]">
                    Page Not Found
                  </span>

                </div>

              </div>

            </div>


            {/* Decorative Gold Frame */}

            <div className="absolute -bottom-5 -right-5 -z-10 hidden h-40 w-40 rounded-2xl border border-[#C4943E]/40 lg:block" />

          </div>

        </div>

      </section>

    </main>
  );
};

export default NotFound;