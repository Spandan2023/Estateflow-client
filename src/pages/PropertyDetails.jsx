import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Copy,
  MapPin,
  Share2,
} from "lucide-react";

import { getSingleProperty } from "../services/propertyService";
import PropertyOverview from "../components/property-details/PropertyOverview";
import PropertyMedia from "../components/property-details/PropertyMedia";
import PropertyContact from "../components/property-details/PropertyContact";
import PropertyLocation from "../components/property-details/PropertyLocation";
import PropertyInquiry from "../components/property-details/PropertyInquiry";

const FALLBACK_IMAGE = "https://placehold.co/1400x900?text=EstateFlow+Property";

const getMediaUrl = (url) => {
  if (!url) return FALLBACK_IMAGE;

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:7000/api";
  const apiOrigin = apiUrl.replace(/\/api\/?$/, "");

  return `${apiOrigin}${url.startsWith("/") ? "" : "/"}${url}`;
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
            "This property could not be loaded. It may no longer be available.",
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
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-5">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#10B981]" />

          <h1 className="mt-5 text-xl font-semibold text-[#0F172A]">
            Loading property details...
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we retrieve this listing.
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-5">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Building2 size={42} className="mx-auto text-slate-300" />

          <h1 className="mt-5 text-2xl font-semibold text-[#0F172A]">
            Property unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error || "This property could not be found."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Return to EstateFlow
          </Link>
        </div>
      </div>
    );
  }

  const imageCount = property.media?.images?.length || 0;
  const mainImage = getMediaUrl(property.media?.images?.[0]?.url);
  const displayPrice = property.priceRange || `₹ ${property.price || "On request"}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-[#0F172A]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981] text-white">
              <Building2 size={20} />
            </span>

            <span>
              <span className="block text-lg font-semibold tracking-tight">
                EstateFlow
              </span>
              <span className="block text-xs text-slate-500">
                Premium Property Listings
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#10B981] hover:text-[#10B981]"
          >
            {copied ? <CheckCircle2 size={17} /> : <Share2 size={17} />}
            <span className="hidden sm:inline">
              {copied ? "Link copied" : "Share"}
            </span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:py-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#10B981]"
        >
          <ArrowLeft size={17} />
          Back to properties
        </button>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-5">
            <div className="relative min-h-[320px] lg:col-span-3 lg:min-h-[560px]">
              <img
                src={mainImage}
                alt={property.title}
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />

              {imageCount > 0 && (
                <span className="absolute bottom-5 left-5 rounded-lg bg-slate-950/75 px-3 py-2 text-sm font-semibold text-white">
                  {imageCount} {imageCount === 1 ? "Photo" : "Photos"}
                </span>
              )}
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-2 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <Building2 size={15} />
                    {property.category || "Property"}
                  </span>

                  {property.status === "sold" && (
                    <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">
                      Sold
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-[#0F172A] sm:text-4xl">
                  {property.title}
                </h1>

                <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-500">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#10B981]" />
                  <span>
                    {property.address
                      ? `${property.address}, ${property.city || ""}`
                      : property.city || "Location details available on request"}
                  </span>
                </p>

                <div className="mt-8 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Asking price
                  </p>

                  <p className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
                    {displayPrice}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Contact EstateFlow for availability and viewing details.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href="#property-inquiry"
                  className="flex w-full items-center justify-center rounded-lg bg-[#10B981] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Enquire About This Property
                </a>

                {property.createdAt && (
                  <p className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={14} />
                    Listed on{" "}
                    {new Date(property.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 px-6 py-7 sm:px-8 lg:px-10">
            <h2 className="text-xl font-semibold text-[#0F172A]">
              About this property
            </h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
              {property.description || "No detailed description is available yet."}
            </p>
          </div>
        </section>

        <PropertyOverview property={property} />
        <PropertyMedia property={property} getMediaUrl={getMediaUrl} />
        <PropertyLocation property={property} />
        <PropertyContact property={property} />
        <PropertyInquiry property={property} />
      </main>
    </div>
  );
}

export default PropertyDetails;