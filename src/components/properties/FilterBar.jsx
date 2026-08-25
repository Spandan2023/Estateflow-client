import { Search, RotateCcw } from "lucide-react";

const FilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  city,
  setCity,
  sort,
  setSort,
  properties,
}) => {
  const categories = [
    "All",
    ...new Set(properties.map((p) => p.category).filter(Boolean)),
  ];

  const cities = [
    "All",
    ...new Set(properties.map((p) => p.city).filter(Boolean)),
  ];

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setCity("All");
    setSort("Newest");
  };

  return (
    <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6">

      <div className="rounded-2xl border border-[#E5D5BC] bg-[#F9F8F6] p-6 shadow-xl">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">

          {/* Search */}
          <div className="relative lg:col-span-2">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2416]/60"
            />

            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E5D5BC] bg-white py-3 pl-11 pr-4 text-[#1A1A1A] outline-none transition placeholder:text-[#2C2416]/50 focus:border-[#C4943E] focus:ring-2 focus:ring-[#C4943E]/20"
            />

          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-[#E5D5BC] bg-white px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#C4943E] focus:ring-2 focus:ring-[#C4943E]/20"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* City */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-xl border border-[#E5D5BC] bg-white px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#C4943E] focus:ring-2 focus:ring-[#C4943E]/20"
          >
            {cities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-[#E5D5BC] bg-white px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#C4943E] focus:ring-2 focus:ring-[#C4943E]/20"
          >
            <option>Newest</option>
            <option>Price Low</option>
            <option>Price High</option>
          </select>

        </div>

        {/* Bottom Row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">

          <p className="text-sm text-[#2C2416]/70">
            Showing{" "}
            <span className="font-semibold text-[#1A1A1A]">
              {properties.length}
            </span>{" "}
            available properties
          </p>

          <button
            onClick={resetFilters}
            className="flex items-center gap-2 rounded-lg border border-[#E5D5BC] px-5 py-2.5 text-[#1A1A1A] transition hover:border-[#C4943E] hover:bg-[#E5D5BC]/40"
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>

        </div>

      </div>
    </section>
  );
};

export default FilterBar;