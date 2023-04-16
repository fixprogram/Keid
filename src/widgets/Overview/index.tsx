import WeekTasks from "@/features/WeekTasks";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
// import PriorityTasks from "./components/PriorityTasks";

export default function Overview() {
  const projectAmount = useAppSelector((state) => state.overview.projectAmount);

  return (
    <>
      <Filter />

      <WeekTasks />

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
