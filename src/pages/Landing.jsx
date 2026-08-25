import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyVideoPopup from "../components/common/PropertyVideoPopup";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";
import { getPublicProperties } from "../services/propertyService";
import Footer from "../components/navigation/Footer";

import sukhneerLogo from "../assets/logo/Sukhneer-logo.png";

const slides = [
  {
    title: "Find a place you'll be proud to call home.",
    description:
      "Explore residential and commercial properties with Sukhneer's professional guidance and trusted real estate expertise.",
    buttonText: "Explore Properties",
    buttonLink: "#properties",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Properties chosen for your future.",
    description:
      "Discover homes, commercial spaces, and investment opportunities that match your lifestyle and requirements.",
    buttonText: "View Our Listings",
    buttonLink: "/properties",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Your property journey starts here.",
    description:
      "Tell us what you are looking for and let our team help you discover the right opportunity.",
    buttonText: "Contact Us",
    buttonLink: "#contact",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
  },
];

const getPropertyImage = (property) => {
  const images = property.media?.images || [];

  if (!images.length) {
    return "/placeholder-property.jpg";
  }

  const firstImage = images[0];

  // If image is already a full URL
  if (typeof firstImage === "string") {
    if (
      firstImage.startsWith("http://") ||
      firstImage.startsWith("https://")
    ) {
      return firstImage;
    }

    const apiUrl =
      import.meta.env.VITE_API_URL || "http://localhost:7000/api";

    const apiOrigin = apiUrl.replace(/\/api\/?$/, "");

    return `${apiOrigin}/uploads/${firstImage}`;
  }

  // If image is an object with a URL
  if (firstImage?.url) {
    return firstImage.url;
  }

  // If image is an object with filename
  if (firstImage?.filename) {
    const apiUrl =
      import.meta.env.VITE_API_URL || "http://localhost:7000/api";

    const apiOrigin = apiUrl.replace(/\/api\/?$/, "");

    return `${apiOrigin}/uploads/${firstImage.filename}`;
  }

  return "/placeholder-property.jpg";
};

function Landing() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await getPublicProperties();

        const fetchedProperties = response.properties || [];

        const randomProperties = [...fetchedProperties].sort(
          () => Math.random() - 0.5,
        );

        setProperties(randomProperties.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
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

  const formatPrice = (price) => {
    if (!price) return "Price on request";

    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const currentSlide = slides[activeSlide];

  return (
    <>
      <main className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">

        {/* ================= NAVBAR ================= */}

        <header className="absolute left-0 right-0 top-0 z-30 border-b border-white/10">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
            <Link to="/" className="flex items-center">
              <img
                src={sukhneerLogo}
                alt="Sukhneer"
                className="h-11 w-auto object-contain"
              />
            </Link>

            <nav className="flex items-center gap-7 text-sm font-medium text-[#F9F8F6]/90">
              <a
                href="/properties"
                className="transition hover:text-[#C4943E]"
              >
                Properties
              </a>

              <a
                href="#contact"
                className="transition hover:text-[#C4943E]"
              >
                Contact
              </a>
            </nav>
          </div>
        </header>

        {/* ================= HERO ================= */}

        <section className="relative min-h-[680px] overflow-hidden bg-[#2C2416]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(26, 26, 26, 0.62),
                  rgba(44, 36, 22, 0.88)
                ),
                url('${currentSlide.image}')
              `,
            }}
          />

          <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 pt-20 sm:px-8">
            <div className="max-w-2xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#C4943E]">
                Sukhneer Real Estate
              </p>

              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {currentSlide.title}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#E5D5BC] sm:text-lg">
                {currentSlide.description}
              </p>

              {currentSlide.buttonLink.startsWith("/") ? (
                <Link
                  to={currentSlide.buttonLink}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#C4943E] px-6 py-3.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#E5D5BC]"
                >
                  {currentSlide.buttonText}
                  <ChevronRight size={18} />
                </Link>
              ) : (
                <a
                  href={currentSlide.buttonLink}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#C4943E] px-6 py-3.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#E5D5BC]"
                >
                  {currentSlide.buttonText}
                  <ChevronRight size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Hero Controls */}

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
                      ? "w-8 bg-[#C4943E]"
                      : "w-2 bg-white/40 hover:bg-white"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-[#C4943E] hover:text-[#1A1A1A]"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-[#C4943E] hover:text-[#1A1A1A]"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ================= FEATURED PROPERTIES ================= */}

        <section
          id="properties"
          className="border-y border-[#E5D5BC] bg-[#F9F8F6]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C4943E]">
                  Featured Properties
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-[#1A1A1A]">
                  Discover your next property
                </h2>

                <p className="mt-3 text-[#5C554B]">
                  Explore selected residential and commercial opportunities.
                </p>
              </div>

              <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C4943E] transition hover:text-[#2C2416]"
              >
                View all properties
                <ChevronRight size={18} />
              </Link>
            </div>

            {!loadingProperties && properties.length > 0 && (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => {
                  const propertyImage = getPropertyImage(property);

                  return (
                    <article
                      key={property._id}
                      className="overflow-hidden rounded-xl border border-[#E5D5BC] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <img
                        src={propertyImage}
                        alt={property.title}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            "/placeholder-property.jpg";
                        }}
                        className="h-56 w-full object-cover"
                      />

                      <div className="p-5">
                        <p className="text-sm font-semibold text-[#C4943E]">
                          {property.category}
                        </p>

                        <h3 className="mt-2 text-xl font-semibold text-[#1A1A1A]">
                          {property.title}
                        </h3>

                        <p className="mt-3 flex items-center gap-2 text-sm text-[#6B6258]">
                          <MapPin
                            size={16}
                            className="text-[#C4943E]"
                          />

                          {property.city || "Location available on request"}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-[#E5D5BC] pt-4">
                          <span className="font-semibold text-[#1A1A1A]">
                            {formatPrice(property.price)}
                          </span>

                          <Link
                            to={`/properties/${property._id}`}
                            className="text-sm font-semibold text-[#C4943E] transition hover:text-[#2C2416]"
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

            {!loadingProperties && properties.length === 0 && (
              <div className="mt-10 rounded-xl border border-[#E5D5BC] bg-white p-10 text-center">
                <p className="text-[#5C554B]">
                  No featured properties are available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================= CONTACT ================= */}

        <section
          id="contact"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="overflow-hidden rounded-2xl border border-[#E5D5BC] bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">

              {/* Left */}

              <div className="bg-[#2C2416] p-8 text-white sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C4943E]">
                  Get In Touch
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight">
                  Let us help you find the right property.
                </h2>

                <p className="mt-5 max-w-md leading-7 text-[#E5D5BC]">
                  Contact the Sukhneer team directly for property information,
                  availability, pricing, and further assistance.
                </p>

                <div className="mt-10 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#C4943E] text-[#1A1A1A]">
                    <Phone size={20} />
                  </span>

                  <div>
                    <p className="text-sm text-[#E5D5BC]">
                      Call our team
                    </p>

                    {/* Replace with actual Sukhneer contact number */}

                    <p className="mt-1 font-semibold">
                      Contact Sukhneer
                    </p>
                  </div>
                </div>
              </div>

              {/* Right - Contact Information */}

              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C4943E]">
                  Contact Information
                </p>

                <h3 className="mt-4 text-2xl font-semibold text-[#1A1A1A]">
                  Speak directly with our team
                </h3>

                <p className="mt-4 leading-7 text-[#5C554B]">
                  For enquiries regarding available properties, site visits,
                  pricing, or other property-related information, please contact
                  Sukhneer directly.
                </p>

                <div className="mt-8 rounded-xl border border-[#E5D5BC] bg-[#F9F8F6] p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#C4943E] text-[#1A1A1A]">
                      <Phone size={20} />
                    </span>

                    <div>
                      <p className="text-sm text-[#6B6258]">
                        Contact Sukhneer
                      </p>

                      {/* Replace with actual Sukhneer contact details */}

                      <p className="mt-2 text-lg font-semibold text-[#1A1A1A]">
                        Contact details coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <PropertyVideoPopup />

      <Footer />
    </>
  );
}

export default Landing;