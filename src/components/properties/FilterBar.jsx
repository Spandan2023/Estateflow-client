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
    <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* City */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {cities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option>Newest</option>
            <option>Price Low</option>
            <option>Price High</option>
          </select>

        </div>

        {/* Bottom Row */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-slate-600 text-sm">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {properties.length}
            </span>{" "}
            available properties
          </p>

          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
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