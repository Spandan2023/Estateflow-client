import PropertyCard from "./PropertyCard";
import { Building2 } from "lucide-react";

const PropertyGrid = ({ loading, properties }) => {
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 animate-pulse"
            >
              <div className="h-56 bg-slate-200"></div>

              <div className="p-6 space-y-4">
                <div className="h-5 bg-slate-200 rounded w-3/4"></div>

                <div className="h-4 bg-slate-200 rounded w-1/2"></div>

                <div className="h-4 bg-slate-200 rounded w-full"></div>

                <div className="h-10 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm py-24 text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
            <Building2
              size={40}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-slate-900">
            No Properties Found
          </h2>

          <p className="mt-3 text-slate-500 max-w-md mx-auto">
            We couldn't find any properties matching your
            search or selected filters. Try changing your
            search criteria.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Available Properties
          </h2>

          <p className="text-slate-500 mt-2">
            {properties.length} properties available
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
          />
        ))}

      </div>

    </section>
  );
};

export default PropertyGrid;