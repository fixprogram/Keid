import WeekTasks from "@/features/WeekTasks";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Cards from "./components/Cards";
import Filter from "./components/Filter";

export default function Overview() {
  const projectAmount = useAppSelector((state) => state.overview.projectAmount);
  const totalTaskAmount = useAppSelector(
    (state) => state.overview.totalTaskAmount
  );
  const overdueTaskAmount = useAppSelector(
    (state) => state.overview.overdueTaskAmount
  );

  return (
    <>
      <Filter />

      <WeekTasks />

      <Cards
        cards={[
          { type: "Task", amount: totalTaskAmount },
          { type: "Habit", amount: overdueTaskAmount },
          { type: "Project", amount: projectAmount },
        ]}
      />
    </>
  );
}
