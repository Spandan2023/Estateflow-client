import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Share2,
} from "lucide-react";

import { getSingleProperty } from "../services/propertyService";

import sukhneerLogo from "../assets/logo/Sukhneer-logo.png";

import PropertyOverview from "../components/property-details/PropertyOverview";
import PropertyMedia from "../components/property-details/PropertyMedia";
import PropertyContact from "../components/property-details/PropertyContact";
import PropertyLocation from "../components/property-details/PropertyLocation";
import PropertyInquiry from "../components/property-details/PropertyInquiry";

import PropertyVideoPopup from "../components/common/PropertyVideoPopup";
import Footer from "../components/navigation/Footer";

const FALLBACK_IMAGE =
  "https://placehold.co/1400x900?text=Sukhneer+Property";

const getMediaUrl = (media) => {
  if (!media) return FALLBACK_IMAGE;

  const url =
    typeof media === "string"
      ? media
      : media.url ||
        media.path ||
        media.filename ||
        media.secure_url ||
        "";

  if (!url) return FALLBACK_IMAGE;

  const apiUrl =
    import.meta.env.VITE_API_URL ||
    "http://localhost:7000/api";

  const apiOrigin = apiUrl.replace(/\/api\/?$/, "");

  // External URLs and base64/data URLs
  if (
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  // Replace old localhost URLs stored in MongoDB
  if (url.startsWith("http://localhost:7000")) {
    const pathname = url.replace(
      "http://localhost:7000",
      ""
    );

    return `${apiOrigin}${pathname}`;
  }

  // Relative paths
  return `${apiOrigin}${
    url.startsWith("/") ? "" : "/"
  }${url}`;
};

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSingleProperty(id);

        setProperty(data.property);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "This property could not be loaded. It may no longer be available."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the property link.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0] px-5">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#E5D5BC] border-t-[#C4943E]" />

          <h1 className="mt-5 text-xl font-semibold text-[#1A1A1A]">
            Loading property details...
          </h1>

          <p className="mt-2 text-sm text-[#2C2416]/60">
            Please wait while we retrieve this listing.
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0] px-5">
        <div className="max-w-md rounded-2xl border border-[#E5D5BC]/50 bg-white p-8 text-center shadow-sm">
          <Building2
            size={42}
            className="mx-auto text-[#C4943E]"
          />

          <h1 className="mt-5 text-2xl font-semibold text-[#1A1A1A]">
            Property unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#2C2416]/60">
            {error || "This property could not be found."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#C4943E] px-5 py-3 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#B78532]"
          >
            Return to Sukhneer
          </Link>
        </div>
      </div>
    );
  }

  const images = property.media?.images || [];

  const imageCount = images.length;

  const mainImage = getMediaUrl(images[0]);

  const displayPrice =
    property.priceRange ||
    (property.price ? `₹ ${property.price}` : "Price on request");
    console.log("PROPERTY DATA:", property);  

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* HEADER */}

      <header className="border-b border-[#E5D5BC]/40 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src={sukhneerLogo}
              alt="Sukhneer"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E5D5BC] px-4 py-2.5 text-sm font-semibold text-[#2C2416] transition hover:border-[#C4943E] hover:text-[#C4943E]"
          >
            {copied ? (
              <CheckCircle2 size={17} />
            ) : (
              <Share2 size={17} />
            )}

            <span className="hidden sm:inline">
              {copied ? "Link copied" : "Share"}
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-5 py-8 md:py-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2C2416]/70 transition hover:text-[#C4943E]"
        >
          <ArrowLeft size={17} />

          Back to properties
        </button>

        {/* HERO */}

        <section className="overflow-hidden rounded-2xl border border-[#E5D5BC]/40 bg-white shadow-sm">
          <div className="grid lg:grid-cols-5">
            {/* IMAGE */}

            <div className="relative min-h-[320px] bg-[#F3EFE8] lg:col-span-3 lg:min-h-[560px]">
              <img
                src={mainImage}
                alt={property.title}
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

              {imageCount > 0 && (
                <span className="absolute bottom-5 left-5 rounded-lg bg-black/70 px-3 py-2 text-sm font-semibold text-white backdrop-blur">
                  {imageCount}{" "}
                  {imageCount === 1 ? "Photo" : "Photos"}
                </span>
              )}
            </div>

            {/* DETAILS */}

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-2 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#E5D5BC]/30 px-3 py-1.5 text-xs font-semibold text-[#2C2416]">
                    <Building2 size={15} />

                    {property.category || "Property"}
                  </span>

                  {property.status === "sold" && (
                    <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                      Sold
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
                  {property.title}
                </h1>

                <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-[#2C2416]/60">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C4943E]"
                  />

                  <span>
                    {property.address
                      ? `${property.address}${
                          property.city
                            ? `, ${property.city}`
                            : ""
                        }`
                      : property.city ||
                        "Location details available on request"}
                  </span>
                </p>

                {/* PRICE */}

                <div className="mt-8 rounded-xl border border-[#E5D5BC]/60 bg-[#FFFCF7] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C4943E]">
                    Asking Price
                  </p>

                  <p className="mt-2 text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                    {displayPrice}
                  </p>

                  <p className="mt-2 text-sm text-[#2C2416]/60">
                    Contact Sukhneer for availability and viewing details.
                  </p>
                </div>
              </div>

              {/* CTA */}

              <div className="mt-8 space-y-3">
                <a
                  href="#property-inquiry"
                  className="flex w-full items-center justify-center rounded-lg bg-[#C4943E] px-5 py-3.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#B78532]"
                >
                  Enquire About This Property
                </a>

                {property.createdAt && (
                  <p className="flex items-center justify-center gap-2 text-xs text-[#2C2416]/45">
                    <CalendarDays size={14} />

                    Listed on{" "}
                    {new Date(
                      property.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="border-t border-[#E5D5BC]/40 px-6 py-7 sm:px-8 lg:px-10">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">
              About this property
            </h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#2C2416]/70">
              {property.description ||
                "No detailed description is available yet."}
            </p>
          </div>
        </section>

        {/* COMPONENTS */}

        <PropertyOverview property={property} />

        <PropertyMedia
          property={property}
          getMediaUrl={getMediaUrl}
        />
        

        <PropertyLocation property={property} />

        <PropertyContact property={property} />

        <PropertyInquiry property={property} />
      </main>

      {/* FOOTER */}

      <Footer />

      {/* FLOATING MARKETING VIDEO */}

      <PropertyVideoPopup />
    </div>
  );
}

export default PropertyDetails;