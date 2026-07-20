import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative h-[500px] flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">

        <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-sm font-medium mb-6">
          EstateFlow Premium Listings
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Find Your
          <span className="text-emerald-400"> Dream Property</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-8 mb-10">
          Browse premium apartments, villas, plots and commercial
          properties across multiple cities. Discover your perfect
          investment with EstateFlow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <button
            onClick={() =>
              window.scrollTo({
                top: 550,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-all font-semibold shadow-lg"
          >
            <Search size={20} />
            Browse Properties
          </button>

          <Link
            to="/contact"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 transition-all font-semibold"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;