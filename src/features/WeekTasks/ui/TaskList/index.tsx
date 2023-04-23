import { TaskCard } from "@/features/TaskCard";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";

export default function TaskList() {
  const tasks = useAppSelector((state) => state.weekTasks.tasks);

  return (
    <ul className="mt-4 flex flex-col gap-4">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard key={task.id} link={`/tasks/${task.id}`} {...task} />
        </li>
      ))}
    </ul>
  );
}
