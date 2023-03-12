import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import FilterBar from "@/components/FilterBar";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { useState } from "react";
import GoalsList from "@/components/GoalsList";

const GOALS = [
  {
    title: "Find a job",
    id: 1,
    category: "Text",
    allTasksAmount: 10,
    completedTasksAmount: 3,
    color: "#A06AF9",
  },
  {
    title: "Level up relationships",
    id: 2,
    category: "Text",
    allTasksAmount: 9,
    completedTasksAmount: 7,
    color: "#FBA3FF",
  },
  {
    title: "Launch Keid",
    id: 3,
    category: "Text",
    allTasksAmount: 9,
    completedTasksAmount: 7,
    color: "#FFDD72",
  },
  {
    title: "Learn how to do 20 pull ups",
    id: 4,
    category: "Text",
    allTasksAmount: 8,
    completedTasksAmount: 7,
    color: "#8E96FF",
  },
];

const FILTERS = ["Active", "Dreams", "All"];

export default function Goals() {
  const [filteredGoals, setFilteredGoals] = useState(GOALS);

  function onSearch(search: string) {
    const searchWithUpperLetter = search
      .split("")
      .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
      .join("");

    setFilteredGoals(() =>
      GOALS.filter((goal) => {
        return (
          goal.title.includes(search) ||
          goal.title.includes(searchWithUpperLetter)
        );
      })
    );
  }

  return (
    <Layout>
      <PageHeader title="Goals" />

      <FilterBar filters={FILTERS}>
        <button type="button">
          <Icon name="home" width={22} height={22} />
        </button>
      </FilterBar>

      <GoalsList goals={filteredGoals} />
      {/* <ul>
        {filteredGoals.map((goal) => (
          <li key={goal.id}>
            <Link href={`goals/${goal.id}`} className="pl-8 pr-3 py-5 block">
              {goal.title}
            </Link>
          </li>
        ))}
      </ul> */}
    </Layout>
  );
}
