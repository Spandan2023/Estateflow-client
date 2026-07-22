import {
  Building2,
  CalendarDays,
  IndianRupee,
  MapPin,
  Tag,
} from "lucide-react";

function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-[#10B981]">
        <Icon size={20} />
      </span>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#0F172A]">{value || "N/A"}</p>
    </div>
  );
}

function PropertyOverview({ property }) {
  const displayPrice =
    property.priceRange || (property.price ? `₹ ${property.price}` : "On request");

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#10B981]">
          At a glance
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#0F172A]">
          Property Overview
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DetailCard
          icon={Building2}
          label="Category"
          value={property.category}
        />

        <DetailCard
          icon={IndianRupee}
          label="Price"
          value={displayPrice}
        />

        <DetailCard icon={MapPin} label="City" value={property.city} />

        <DetailCard
          icon={Tag}
          label="Availability"
          value={
            property.status
              ? property.status.charAt(0).toUpperCase() +
                property.status.slice(1)
              : "Available"
          }
        />
      </div>

      {property.createdAt && (
        <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} className="text-[#10B981]" />
          Listed on{" "}
          {new Date(property.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
    </section>
  );
}

export default PropertyOverview;