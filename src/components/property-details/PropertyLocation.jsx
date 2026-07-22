import { ExternalLink, MapPin, Navigation } from "lucide-react";

function PropertyLocation({ property }) {
  const hasMapsLink = Boolean(property.mapsLink);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#10B981]">
          Location
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#0F172A]">
          Property Location
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-[#10B981]">
            <MapPin size={23} />
          </span>

          <h3 className="mt-5 text-lg font-semibold text-[#0F172A]">
            Address
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            {property.address || "Address details are available on request."}
          </p>

          {property.city && (
            <p className="mt-2 text-sm font-medium text-slate-500">
              {property.city}
            </p>
          )}

          {hasMapsLink ? (
            <a
              href={property.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <Navigation size={17} />
              Open in Google Maps
              <ExternalLink size={15} />
            </a>
          ) : (
            <p className="mt-6 text-sm text-slate-500">
              Map directions will be shared by our team on request.
            </p>
          )}
        </div>

        <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <div>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-[#10B981]">
              <MapPin size={26} />
            </span>

            <h3 className="mt-4 font-semibold text-[#0F172A]">
              Conveniently located
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Use the Google Maps link for precise directions and nearby area
              information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyLocation;