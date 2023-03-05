import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import SearchPanel from "@/components/Layout/components/SearchPanel/SearchPanel";
import Link from "next/link";
import { useState } from "react";

const GOALS = [
  {
    title: "Find a job",
    id: 1,
  },
  {
    title: "Level up relationships",
    id: 2,
  },
  {
    title: "Launch Keid",
    id: 3,
  },
  {
    title: "Learn how to do 20 pull ups",
    id: 4,
  },
  {
    title: "Find a job",
    id: 5,
  },
  {
    title: "Level up relationships",
    id: 6,
  },
  {
    title: "Launch Keid",
    id: 7,
  },
  {
    title: "Learn how to do 20 pull ups",
    id: 8,
  },
];

export default function Goals() {
  const [filteredGoals, setFilteredGoals] = useState(GOALS);

  function onSearch(search: string) {
    setFilteredGoals(() =>
      GOALS.filter((goal) => goal.title.startsWith(search))
    );
  }

  return (
    <Layout>
      <div className="flex items-end mb-5">
        <h2 className="font-medium text-xl">Goals</h2>

        <span className="font-light text-xs opacity-75 ml-3 pb-[2px]">
          2023-2024
        </span>

        <button className="ml-auto">
          <Icon name="filters" color="#fff" size={30} />
        </button>
      </div>

      <SearchPanel onSearch={onSearch} />

      <ul>
        {filteredGoals.map((goal) => (
          <li key={goal.id}>
            <Link href={`goals/${goal.id}`} className="pl-8 pr-3 py-5 block">
              {goal.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
