import { FC } from "react";
interface Props {
  filters: string[];
  activeFilter: string;
  filterClickHandler: Function;
  children?: React.ReactNode;
}

const FilterBar: FC<Props> = ({
  filters,
  activeFilter,
  filterClickHandler,
  children,
}: Props) => {
  return (
    <div className="flex items-center justify-between mt-8 gap-4">
      <ul className="flex overflow-x-scroll">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <li key={filter}>
              <button
                type="button"
                className={`font-semibold text-base py-1 px-4 rounded-2xl	 ${
                  isActive ? "text-white bg-primary" : "text-deactive"
                }`}
                onClick={() => filterClickHandler(filter)}
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
