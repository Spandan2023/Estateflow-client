import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>

          <p className="text-emerald-600 font-semibold tracking-widest uppercase mb-3">
            Error 404
          </p>

          <h1 className="text-7xl md:text-8xl font-black text-slate-900 leading-none">
            404
          </h1>

          <h2 className="mt-6 text-4xl font-bold text-slate-800">
            Looks like this property has moved.
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">
            The page you're looking for doesn't exist, may have been removed,
            or the URL might be incorrect.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-emerald-600 transition-all duration-300 shadow-lg"
            >
              <Home size={18} />
              Back Home
            </Link>

            <Link
              to="/properties"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
            >
              <Search size={18} />
              Browse Properties
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

          </div>

        </div>

        {/* Right Illustration */}

        <div className="relative">

          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-10">

            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Property"
              className="rounded-2xl w-full h-[420px] object-cover"
            />

            <div className="absolute top-8 right-8 bg-red-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg">
              404
            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default NotFound;