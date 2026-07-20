import { ChevronDown } from "lucide-react";

const LoadMore = ({ onClick }) => {
  return (
    <section className="pb-20">
      <div className="flex justify-center">

        <button
          onClick={onClick}
          className="
            group
            inline-flex
            items-center
            gap-2
            px-8
            py-4
            rounded-xl
            bg-slate-900
            text-white
            font-semibold
            shadow-lg
            hover:bg-emerald-600
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          Load More Properties

          <ChevronDown
            size={20}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </button>

      </div>
    </section>
  );
};

export default LoadMore;