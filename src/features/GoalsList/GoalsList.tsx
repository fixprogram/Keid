import ColumnGoalItem from "./components/ColumnGoalItem";
import GridGoalItem from "./components/GridGoalItem";

export type Goal = {
  id: number;
  title: string;
  category: string;
  color: string;
  allTasksAmount?: number;
  completedTasksAmount?: number;
};

interface Props {
  goals: Goal[];
  listStyle: string;
}

export default function GoalsList({ goals, listStyle }: Props) {
  return (
    <ul
      className={`mt-8 grid gap-4 ${
        listStyle === "grid" ? "grid-cols-2" : null
      }`}
    >
      {goals.map((goal) => {
        if (listStyle === "grid") {
          return <GridGoalItem key={goal.id} goal={goal} />;
        }
        return <ColumnGoalItem key={goal.id} goal={goal} />;
      })}
    </ul>
  );
}
