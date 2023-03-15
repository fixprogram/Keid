import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import FilterBar from "@/components/FilterBar";
import PageHeader from "@/components/PageHeader";
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

// Let's call the page Projects instead of Goals, because Dreams can be here as well
// Dream is something like a Goal, but without actions and deadlines

const FILTERS = ["Active", "Dreams", "All"];

export default function Goals() {
  const [filteredGoals, setFilteredGoals] = useState(GOALS);
  const [listStyle, setListStyle] = useState("column");

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

  const actionIconName = listStyle === "column" ? "dashboard" : "goals";
  const newListStyle = listStyle === "column" ? "grid" : "column";

  return (
    <Layout>
      <PageHeader title="Projects" />

      <FilterBar filters={FILTERS}>
        <button type="button" onClick={() => setListStyle(newListStyle)}>
          <Icon name={actionIconName} width={22} height={22} />
        </button>
      </FilterBar>

      <GoalsList goals={filteredGoals} listStyle={listStyle} />
    </Layout>
  );
}
