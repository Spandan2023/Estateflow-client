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
            rounded-xl
            bg-[#1A1A1A]
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:bg-[#C4943E]
            hover:text-[#1A1A1A]
            hover:shadow-xl
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