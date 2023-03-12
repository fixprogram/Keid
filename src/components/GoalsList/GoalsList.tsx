import GoalItem from "./components/GoalItem";

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
}

export default function GoalsList({ goals }: Props) {
  return (
    <ul className="mt-8">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </ul>
  );
}
