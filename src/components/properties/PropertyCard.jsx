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

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

      {/* Image */}
      <div className="relative overflow-hidden h-64">

        <img
          src={property.images?.[0] || property.image || "/placeholder-property.jpg"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Featured Badge */}
        {property.featured && (
          <span className="absolute top-4 left-4 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
            <Star size={12} fill="currentColor" />
            Featured
          </span>
        )}

        {/* Category */}
        <span className="absolute bottom-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
          {property.category}
        </span>

        {/* Wishlist (UI only) */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition"
        >
          <Heart
            size={18}
            className="text-slate-600 hover:text-red-500"
          />
        </button>

      </div>

      {/* Content */}
      <div className="p-6">

        <h2 className="text-xl font-bold text-slate-900 line-clamp-1">
          {property.title}
        </h2>

        <div className="flex items-center gap-2 mt-3 text-slate-500 text-sm">
          <MapPin size={16} />
          <span>
            {property.city}, {property.location}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-5 text-emerald-600">

          <IndianRupee size={20} />

          <span className="text-2xl font-bold">
            {formatPrice(property.price)}
          </span>

        </div>

        {/* Property Details */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="flex items-center gap-2 text-slate-600">

            <BedDouble size={18} />

            <span className="text-sm">
              {property.bhk || "N/A"} BHK
            </span>

          </div>

          <div className="flex items-center gap-2 text-slate-600">

            <Square size={18} />

            <span className="text-sm">
              {property.area || "--"} sq.ft
            </span>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-slate-200 my-6"></div>

        {/* Footer */}

        <div className="flex items-center justify-between">

          <span className="text-xs text-slate-500">
            {property.status || "Available"}
          </span>

          <Link
            to={`/properties/${property._id}`}
            className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg transition-all font-medium"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
};

export default PropertyCard;