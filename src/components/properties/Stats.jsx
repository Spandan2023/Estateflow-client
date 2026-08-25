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
      color: "bg-[#E5D5BC] text-[#2C2416]",
    },
    {
      title: "Cities Covered",
      value: stats.cities,
      icon: MapPinned,
      color: "bg-[#2C2416] text-[#E5D5BC]",
    },
    {
      title: "Property Categories",
      value: stats.categories,
      icon: Layers3,
      color: "bg-[#4A7C59]/15 text-[#4A7C59]",
    },
    {
      title: "Featured Listings",
      value: stats.featured,
      icon: Star,
      color: "bg-[#C4943E]/20 text-[#C4943E]",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {statCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="rounded-2xl border border-[#E5D5BC] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-[#2C2416]/65">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-[#1A1A1A]">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}
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