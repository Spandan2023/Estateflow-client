import {
  ExternalLink,
  MapPin,
  Navigation,
} from "lucide-react";

function PropertyLocation({ property }) {
  const locationQuery = [
    property.address,
    property.city,
  ]
    .filter(Boolean)
    .join(", ");

  const mapUrl =
    property.mapsLink ||
    (locationQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          locationQuery
        )}`
      : "");

  const embedUrl = locationQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        locationQuery
      )}&output=embed`
    : "";

  return (
    <section className="mt-8 rounded-2xl border border-[#E5D5BC]/40 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#C4943E]">
          Location
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#1A1A1A]">
          Property Location
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E5D5BC]/50 bg-[#FFFCF7] p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5D5BC]/40 text-[#C4943E]">
            <MapPin size={23} />
          </span>

          <h3 className="mt-5 text-lg font-semibold text-[#1A1A1A]">
            Address
          </h3>

          <p className="mt-3 leading-7 text-[#2C2416]/70">
            {property.address ||
              "Address details are available on request."}
          </p>

          {property.city && (
            <p className="mt-2 text-sm font-medium text-[#2C2416]/55">
              {property.city}
            </p>
          )}

          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#C4943E] px-4 py-3 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#B78532]"
            >
              <Navigation size={17} />

              Open in Google Maps

              <ExternalLink size={15} />
            </a>
          )}
        </div>

        <div className="min-h-[320px] overflow-hidden rounded-2xl border border-[#E5D5BC]/50 bg-[#F8F5F0]">
          {embedUrl ? (
            <iframe
              title={`${property.title} location`}
              src={embedUrl}
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center p-6 text-center">
              <div>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E5D5BC]/40 text-[#C4943E]">
                  <MapPin size={26} />
                </span>

                <h3 className="mt-4 font-semibold text-[#1A1A1A]">
                  Location coming soon
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#2C2416]/60">
                  Detailed location information will be
                  added shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PropertyLocation;