import Icon from "@/shared/ui/Icon";
import { useState } from "react";

interface Props {
  onSearch: Function;
}

export default function SearchPanel({ onSearch }: Props) {
  //   const [search, setSearch] = useState("");

  return (
    <div className="relative mb-6">
      <div className="absolute top-3.5 left-3.5">
        <Icon name="search" color="#fff" width={20} height={20} />
      </div>
      <input
        type="search"
        placeholder="Search goal..."
        className="py-3 pl-11 pr-5 w-full bg-gray-100 border-[1px] border-lightGray rounded"
        // value={search}
        onChange={(e) => onSearch(e.target.value)}
        // onBlur={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
