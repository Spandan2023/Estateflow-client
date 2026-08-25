import { Link } from "react-router-dom";

import {
  MapPin,
  BedDouble,
  Square,
  IndianRupee,
  Star,
  Heart,
} from "lucide-react";

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    if (!price) return "Price on Request";

    return new Intl.NumberFormat("en-IN").format(price);
  };

  // ================= IMAGE HANDLING =================

  const getPropertyImage = () => {
    const firstImage = property.media?.images?.[0] || property.images?.[0];

    if (!firstImage) {
      return "/placeholder-property.jpg";
    }

    const imageUrl =
      typeof firstImage === "string"
        ? firstImage
        : firstImage.url || firstImage.path || firstImage.filename || "";

    if (!imageUrl) {
      return "/placeholder-property.jpg";
    }

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:7000/api";

    const apiOrigin = apiUrl.replace(/\/api\/?$/, "");

    // Already an external image
    if (imageUrl.startsWith("https://") || imageUrl.startsWith("data:")) {
      return imageUrl;
    }

    // Fix old localhost URLs stored in MongoDB
    if (imageUrl.startsWith("http://localhost:7000")) {
      const pathname = imageUrl.replace("http://localhost:7000", "");

      return `${apiOrigin}${pathname}`;
    }

    // Relative image path
    return `${apiOrigin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  };

  const image = getPropertyImage();
  console.log("PROPERTY DATA:", property);

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E5D5BC] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={property.title}
          onError={(e) => {
            e.currentTarget.src = "/placeholder-property.jpg";
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Featured Badge */}
        {property.isFeatured && (
          <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#C4943E] px-3 py-1 text-xs font-semibold text-[#1A1A1A] shadow">
            <Star size={12} fill="currentColor" />
            Featured
          </span>
        )}

        {/* Category */}
        <span className="absolute bottom-4 left-4 rounded-full bg-[#2C2416] px-3 py-1 text-xs font-medium text-[#F9F8F6] shadow">
          {property.category}
        </span>

        {/* Wishlist UI */}
        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
        >
          <Heart
            size={18}
            className="text-[#1A1A1A] transition hover:text-[#C4943E]"
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="line-clamp-1 text-xl font-bold text-[#1A1A1A]">
          {property.title}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-sm text-[#2C2416]/65">
          <MapPin size={16} />

          <span>
            {property.address ? `${property.address}, ` : ""}
            {property.city}
          </span>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-center gap-1 text-[#C4943E]">
          <IndianRupee size={20} />

          <span className="text-2xl font-bold">
            {formatPrice(property.price)}
          </span>
        </div>

        {/* Property Details */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-[#2C2416]/70">
            <BedDouble size={18} />

            <span className="text-sm">
              {property.bhk ? `${property.bhk} BHK` : "Not specified"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#2C2416]/70">
            <Square size={18} />

            <span className="text-sm">
              {property.area ? `${property.area} sq.ft` : "Not specified"}
            </span>
          </div>
        </div>

        <div className="my-6 border-t border-[#E5D5BC]" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          {property.status && (
            <span className="text-xs capitalize text-[#2C2416]/60">
              {property.status}
            </span>
          )}

          <Link
            to={`/properties/${property._id}`}
            className="rounded-lg bg-[#1A1A1A] px-5 py-2.5 font-medium text-white transition-all duration-300 hover:bg-[#C4943E] hover:text-[#1A1A1A]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
