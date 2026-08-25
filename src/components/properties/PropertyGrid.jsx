import PropertyCard from "./PropertyCard";
import { Building2 } from "lucide-react";

const PropertyGrid = ({ loading, properties }) => {

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

          {[...Array(6)].map((_, index) => (

            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl border border-[#E5D5BC] bg-white shadow-sm"
            >

              <div className="h-56 bg-[#E5D5BC]/50" />

              <div className="space-y-4 p-6">

                <div className="h-5 w-3/4 rounded bg-[#E5D5BC]/50" />

                <div className="h-4 w-1/2 rounded bg-[#E5D5BC]/40" />

                <div className="h-4 w-full rounded bg-[#E5D5BC]/40" />

                <div className="h-10 rounded bg-[#E5D5BC]/50" />

              </div>

            </div>

          ))}

        </div>

      </section>
    );
  }


  if (properties.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="rounded-3xl border border-[#E5D5BC] bg-white py-24 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E5D5BC]/40">

            <Building2
              size={40}
              className="text-[#C4943E]"
            />

          </div>

          <h2 className="mt-6 text-3xl font-bold text-[#1A1A1A]">
            No Properties Found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[#2C2416]/65">
            We couldn't find any properties matching your search
            or selected filters. Try changing your search criteria.
          </p>

        </div>

      </section>
    );
  }


  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C4943E]">
            Explore Sukhneer
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#1A1A1A]">
            Available Properties
          </h2>

          <p className="mt-2 text-[#2C2416]/65">
            {properties.length} properties available
          </p>

        </div>

      </div>


      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

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