import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createInquiry } from "../services/inquiryService";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { getPublicProperties } from "../services/propertyService";

const slides = [
  {
    title: "Find a property that fits your future.",
    description:
      "Discover verified homes, commercial spaces, and investment opportunities across leading locations.",
    buttonText: "Explore Properties",
    buttonLink: "#properties",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Premium properties. Trusted guidance.",
    description:
      "EstateFlow connects you with quality real estate options and professional assistance at every stage.",
    buttonText: "View Our Listings",
    buttonLink: "/properties",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Speak with our property specialists.",
    description:
      "Share your requirements and receive guidance for your next real estate investment.",
    buttonText: "Reach Out Today",
    buttonLink: "#contact",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
  },
];

function Landing() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
  try {
    const response = await getPublicProperties();

    const properties = response.properties || [];

    const randomProperties = [...properties].sort(
      () => Math.random() - 0.5
    );

    setProperties(randomProperties.slice(0, 3));
  } catch (error) {
    console.error(error);
    setProperties([]);
  } finally {
    setLoadingProperties(false);
  }
};

    fetchFeaturedProperties();
  }, []);

  const previousSlide = () => {
    setActiveSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1,
    );
  };

  const nextSlide = () => {
    setActiveSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1,
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createInquiry({
        customerName: formData.name,
        phone: formData.phone,
        message: formData.message,
        source: "landing",
      });

      setSubmitted(true);

      setFormData({
        name: "",
        phone: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Price on request";

    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const currentSlide = slides[activeSlide];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/15">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-semibold text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981]">
              <Building2 size={21} />
            </span>
            EstateFlow
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-200 md:flex">
            <a href="#about" className="transition hover:text-white">
              About Us
            </a>

            <a href="/properties" className="transition hover:text-white">
              Properties
            </a>

            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <Link
            to="/login"
            className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#0F172A]"
          >
            Employee Login
          </Link>
        </div>
      </header>

      <section className="relative min-h-[680px] overflow-hidden bg-[#0F172A]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.76), rgba(15, 23, 42, 0.9)), url('${currentSlide.image}')`,
          }}
        />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 pt-20 sm:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#10B981]">
              EstateFlow Real Estate
            </p>

            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {currentSlide.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              {currentSlide.description}
            </p>

            <a
              href={currentSlide.buttonLink}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              {currentSlide.buttonText}
              <ChevronRight size={18} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition ${
                  activeSlide === index
                    ? "w-8 bg-[#10B981]"
                    : "w-2 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-white hover:text-[#0F172A]"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-white hover:text-[#0F172A]"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
              About EstateFlow
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0F172A] sm:text-4xl">
              Real estate decisions made simpler and more reliable.
            </h2>

            <p className="mt-6 leading-7 text-slate-600">
              EstateFlow helps customers find suitable residential and
              commercial properties with clear communication, verified
              information, and professional assistance from enquiry to
              ownership.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-[#10B981]"
                  size={20}
                />
                <span className="text-sm font-medium text-slate-700">
                  Verified property listings
                </span>
              </div>

              <div className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-[#10B981]"
                  size={20}
                />
                <span className="text-sm font-medium text-slate-700">
                  Professional local guidance
                </span>
              </div>

              <div className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-[#10B981]"
                  size={20}
                />
                <span className="text-sm font-medium text-slate-700">
                  Residential and commercial properties
                </span>
              </div>

              <div className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-[#10B981]"
                  size={20}
                />
                <span className="text-sm font-medium text-slate-700">
                  Customer-focused support
                </span>
              </div>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
            alt="Modern property exterior"
            className="h-[420px] w-full rounded-2xl object-cover shadow-sm"
          />
        </div>
      </section>

      <section id="properties" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
                Featured Properties
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-[#0F172A]">
                Most visited estates
              </h2>

              <p className="mt-3 text-slate-600">
                Explore properties selected from our latest listings.
              </p>
            </div>

            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] transition hover:text-emerald-700"
            >
              Show all properties
              <ChevronRight size={18} />
            </Link>
          </div>

          {!loadingProperties && properties.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.slice(0, 3).map((property) => {
                const propertyImage = Array.isArray(property.images)
                  ? property.images[0]
                  : property.images;

                return (
                  <article
                    key={property._id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
                  >
                    {propertyImage ? (
                      <img
                        src={propertyImage}
                        alt={property.title}
                        className="h-56 w-full object-cover"
                      />
                    ) : (
                      <div className="h-56 bg-slate-100" />
                    )}

                    <div className="p-5">
                      <p className="text-sm font-medium text-[#10B981]">
                        {property.category}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">
                        {property.title}
                      </h3>

                      <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />
                        {property.city}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="font-semibold text-[#0F172A]">
                          {formatPrice(property.price)}
                        </span>

                        <Link
                          to={`/properties/${property._id}`}
                          className="text-sm font-semibold text-[#10B981]"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-2">
          <div className="bg-[#0F172A] p-8 text-white sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10B981]">
              Reach Out
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              Let us help you find the right property.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-slate-300">
              Share your enquiry and our team will contact you with relevant
              property options and the next steps.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#10B981]">
                <Phone size={20} />
              </span>

              <div>
                <p className="text-sm text-slate-400">Call our team</p>
                <p className="mt-1 font-semibold">+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            {submitted && (
              <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Thank you. Your enquiry has been received.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Contact Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E293B]">
                  Your Enquiry
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us what type of property you are looking for..."
                  required
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] py-3.5 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Send Enquiry"}

                {!loading && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F172A] text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-semibold text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10B981]">
              <Building2 size={18} />
            </span>
            EstateFlow
          </Link>

          <p className="text-sm">
            © {new Date().getFullYear()} EstateFlow. All rights reserved.
          </p>

          <Link
            to="/login"
            className="text-sm font-medium text-[#10B981] hover:text-emerald-400"
          >
            Employee Portal
          </Link>
        </div>
      </footer>
    </main>
  );
}

export default Landing;
