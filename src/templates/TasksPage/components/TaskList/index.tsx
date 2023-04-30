import { TaskCard } from "@/features/TaskCard";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Fragment } from "react";
import { FilterType } from "../../config/types";

export default function TaskList() {
  const activeFilter = useAppSelector((state) => state.tasks.activeFilter);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  console.log("Tasks: ", tasks);

  return (
    <section className="mt-8 flex flex-col gap-4">
      {tasks[activeFilter as FilterType].map((task) => (
        <TaskCard key={task.id} link={`/tasks/${task.id}`} {...task} />
      ))}
    </section>
  );
}
