import {
  Building2,
  MapPinned,
  Layers3,
  Star,
} from "lucide-react";

const Stats = ({ stats }) => {
  const statCards = [
    {
      title: "Available Properties",
      value: stats.total,
      icon: Building2,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Cities Covered",
      value: stats.cities,
      icon: MapPinned,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Property Categories",
      value: stats.categories,
      icon: Layers3,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Featured Listings",
      value: stats.featured,
      icon: Star,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {statCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-slate-900">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <Icon size={28} />
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default Stats;