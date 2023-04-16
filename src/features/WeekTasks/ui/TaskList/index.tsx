import TaskCard from "@/features/TaskCard";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Task } from "@prisma/client";

export default function TaskList() {
  const tasks = useAppSelector((state) => state.weekTasks.tasks);

  console.log("Tasks: ", tasks);
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            key={task.id}
            link={`/tasks/${task.id}`}
            title={task.title}
            deadline={task.deadline}
            style={task.style}
            progress={task.progress}
            completed={task.completed}
          />
        </li>
      ))}
    </ul>
  );
}
