import { FC, useState } from "react";

interface Props {
  filters: string[];
  children: React.ReactNode;
}

const FilterBar: FC<Props> = ({ filters = [], children }: Props) => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  return (
    <div className="flex items-center justify-between mt-8">
      <ul className="flex">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <li key={filter}>
              <button
                type="button"
                className={`font-semibold text-base py-1 px-4 rounded-2xl	 ${
                  isActive ? "text-white bg-primary" : "text-deactive"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            </li>
          );
        })}
      </ul>

      {children}
    </div>
  );
};

export default FilterBar;
