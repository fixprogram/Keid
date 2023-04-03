import TaskCard from "@/features/TaskCard";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Fragment } from "react";

export default function TaskList() {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  console.log("Tasks: ", tasks);

  return (
    <section className="mt-8 flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          link={`/tasks/${task.id}`}
          title={task.title}
          deadline={task.deadline}
          style={task.style}
          progress={50}
        />
      ))}
    </section>
  );
}
