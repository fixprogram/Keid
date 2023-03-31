import { useSelector } from "react-redux";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import PriorityTasks from "./components/PriorityTasks";

export default function Overview() {
  const projectAmount = useSelector((state) => state.overview.projectAmount);

  return (
    <>
      <Filter />

      <PriorityTasks />

      <Cards
        cards={[
          { type: "Task", amount: 10 },
          { type: "Habit", amount: 4 },
          { type: "Project", amount: projectAmount },
        ]}
      />
    </>
  );
}
